'use strict';

require('babel-register')({
  presets: ['es2015'],
});

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const PubNub = require('pubnub');
const storage = require('node-persist');

const {config} = require('../config');

storage.initSync();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

let hostname;
let github;
switch (process.argv[2]) {
  case 'android':
    hostname = config.host.android;
    github = config.github.android;
    break;
  case 'ios':
    hostname = config.host.ios;
    github = config.github.ios;
    break;
  default:
    console.error('You must provide a command-line argument that specifies whether running for Android or iOS');
    console.error();
    console.error('Usage: npm run serve [android|ios]');
    process.exit(1);
    break; // notreachable
}

/*
 * set up PubNub
 */
const pubnubHandle = new PubNub(
  Object.assign({}, config.pubnub, {
    error: error => {
      console.error('Failed to initialize PubNub:', error);
    }
  })
);

const executeGrant = options =>
  new Promise((resolve, reject) => {
    pubnubHandle.grant(options,
      status => {
        if (status.error) {
          reject(new Error(`Grant failed: ${status.category}`));
        }
        else {
          resolve();
        }
      });
  });

/*
 * grant to serverAuth the ability to add/remove channels to any channel group
 */
const grantOptions = {
  manage: true,
  read: true,
  write: true,
  ttl: 0,
};

executeGrant(grantOptions)
  .catch(error => {
    console.error('Failed to grant authentication permission', status.category);
  });

passport.use(
  new GithubStrategy({
    clientID: github.clientId,
    clientSecret: github.clientSecret,
    callbackURL: `http://${hostname}:${config.port}/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    let user = profile;
    user.accessToken = accessToken;
    return done(null, user);
  }
));

passport.serializeUser((user, done) =>
  storage.setItem(`user_${user.id}`, user)
    .then(() => done(null, user.id))
);

passport.deserializeUser((id, done) =>
  done(null, storage.getItem(`user_${id}`))
);

app.get('/login', passport.authenticate('github'),
  (req, res) => {
    // allow user to publish to open channels
    executeGrant({
      channels: [config.channel],
      channelGroups: [],
      authKeys: [req.user.accessToken],
      ttl: 0,
      read: true,
      write: true,
    })
    .then(() => res.status(200).send())
    .catch(error => res.status(403).send(error.stack));
  });

app.get('/callback',
  passport.authenticate(
    'github',
    { failureRedirect: '/login' }),
  (req, res) => res.redirect(`reactchat://${req.user.accessToken}`)
);

const findUser = predicate => storage.values().find(predicate);

app.get('/user', (req, res) => {
  const user = findUser(u => u.accessToken === req.query.accessToken);
  if (user) {
    res.status(200).send(formatUser(user._json));
  }
  res.status(404).send();
});

app.listen(config.port, '0.0.0.0', () => console.log(`Listening on port ${config.port}`));

const formatUser = (user) => ({
  login: user.login,
  id: user.id,
  avatar_url: user.avatar_url,
})
