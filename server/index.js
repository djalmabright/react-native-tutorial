'use strict';

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const pubnub = require('pubnub');
const config = require('../constants').config;

const storage = require('node-persist');
storage.initSync();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

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

app.get('/login', passport.authenticate('github'),
  (req, res) => {
    res.status(200).send();
  });

app.get('/callback',
  passport.authenticate(
    'github',
    {failureRedirect: '/login'}),
  (req, res) => {
    console.log('redir', `reactchat://${req.user.accessToken}`);
    res.redirect(`reactchat://${req.user.accessToken}`);
  });

app.listen(config.port, () => console.log('Listening on port ' + config.port));
