'use strict';

require('babel-register')({
  presets: ['es2015'],
});

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const PubNub = require('pubnub');

const {channel, config} = require('../constants');

const storage = require('node-persist');

storage.initSync();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

const pubnubHandle = new PubNub(
  Object.assign({}, config.server, {
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

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
