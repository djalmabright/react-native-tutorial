'use strict';

require('babel-register')({
  presets: ['es2015'],
});

const express = require('express');
const passport = require('passport');
const PubNub = require('pubnub');

const GithubStrategy = require('passport-github2').Strategy;

const fetch = require('isomorphic-fetch');

const storage = require('node-persist');

const {config} = require('../config');
const {createChannels} = require('../services/channel');

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

const pubnubHandle = new PubNub(
  Object.assign({}, config.pubnub, {
    error: error => {
      console.error('Failed to initialize PubNub:', error);
    }
  }));

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


const grantOptions = {
  authKey: config.pubnub.authKey,
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
  done(null, storage.getItem(`user_${user.id}`))
);

app.get('/login', passport.authenticate('github'),
  (req, res) => {
    // allow user to publish to open channels
    executeGrant({
      channels: [channel],
      channelGroups: [],
      authKeys: [req.user.accessToken],
      ttl: 0,
      read: true,
      write: true,
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(error => {
      res.status(403).send(error.stack);
    });
  });

app.get('/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
  (req, res) => res.redirect(`reactchat://${req.user.accessToken}`));

const findUser = predicate => storage.values().find(predicate);

app.get('/user',
  (req, res) => {
    const user = findUser(u => u.accessToken === req.query.accessToken);
    if (user) {
      res.status(200).send(formatUser(user._json));
    }
    else {
      res.status(404).send();
    }
  });

app.get('/friends',
  (req, res) => {
    const user = findUser(u => u.accessToken === req.query.accessToken);
    if (user == null) {
      res.status(500).send();
      return;
    }

    const promises = [
      fetch(user._json.followers_url).then(r => r.json()),
      fetch(user._json.following_url.match(/^.+(?={)/)[0]).then(r => r.json())
    ];

    Promise.all(promises)
      .then(([followers, following]) => {
        // grab unique members of both lists
        const friends = followers.concat(following);

        // create direct conversation channels
        const friendChannels = createChannels(user.id, friends.map(f => f.id));
  
        executeGrant({
          channels: friendChannels,
          channelGroups: [],
          authKeys: [user.accessToken],
          ttl: 0,
          read: true,
          write: true,
          manage: false,
        })
        .catch(error => {
          res.status(403).send(status.category);
        })
        .then(() => {
          const result = {};

          friends.map(formatUser).forEach(u => result[u.id] = u);

          res.status(200).send(result);
        });
      })
      .catch(error => {
        console.error('Failed to retrieve friends list', error);
      });
    });

const port = process.env.PORT || config.port;

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));

const formatUser = user => ({
  avatarUrl: user.avatar_url,
  id: user.id,
  login: user.login,
});

