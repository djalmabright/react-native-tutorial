'use strict';

require('babel-register')({
  presets: ['es2015'],
});

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const PubNub = require('pubnub');

const {channel, commonConfiguration} = require('../constants/configuration-base');

const {config: android} = require('../constants/configuration.android');
const {config: ios} = require('../constants/configuration.ios');

const storage = require('node-persist');

storage.initSync();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

let config;
switch (process.argv[2]) {
  case 'android':
    config = android;
    break;
  case 'ios':
    config = ios;
    break;
  default:
    console.error('You must provide a command-line argument that specifies whether running for Android or iOS');
    console.error();
    console.error('Usage: npm run serve [android|ios]');
    process.exit(1);
    break; // notreachable
}

const pubnubHandle = new PubNub(
  Object.assign({}, commonConfiguration, {
    error: error => {
      console.error('Failed to initialize PubNub:', error);
    }
  }));

passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: `${config.host}/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    let user = profile;
    user.accessToken = accessToken;
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  storage.setItem(`user_${user.id}`, user);
  done(null, user.id)
});

passport.deserializeUser((id, done) =>
  done(null, storage.getItem(`user_${user.id}`))
);

const authenticationTokens = [];

app.get('/login', passport.authenticate('github'),
  (req, res) => {
    authenticationTokens.push(req.user.accessToken);

    const grant = {
      channels: [channel],
      channelGroups: [],
      authKeys: authenticationTokens,
      ttl: 0,
      read: true,
      write: true,
      manage: true,
    };

    pubnubHandle.grant(grant,
      status => {
        if (status.error) {
          res.status(403).send();
        }
        else {
          res.status(200).send();
        }
      });
  });

app.get('/callback',
  passport.authenticate(
    'github',
    {failureRedirect: '/login'}),
  (req, res) => {
    res.redirect(`reactchat://${req.user.accessToken}`);
  });

app.listen(config.port, '0.0.0.0', () => console.log(`Listening on port ${config.port}`));
