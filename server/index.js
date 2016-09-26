'use strict';

require('babel-register')({
  presets: ['es2015'],
});

const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const PubNub = require('pubnub');
const I = require('immutable');

const {channel, commonConfiguration} = require('../constants/configuration-base');

const {config: android} = require('../constants/configuration.android');
const {config: ios} = require('../constants/configuration.ios');

require('isomorphic-fetch');
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

/*
 * set up PubNub
 */
const pubnubHandle = new PubNub(
  Object.assign({}, config.server, {
    error: error => {
      console.error('Failed to initialize PubNub:', error);
    }
  })
);

/*
 * grant to serverAuth the ability to add/remove channels to any channel group
 */
pubnubHandle.grant(
  {
    authKey: config.server.authKey,
    manage: true,
    read: true,
    write: true,
    ttl: 0,
  },
  status => status.error ?
    console.error(status.error) :
    console.log('PubNub initialized')
);

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

passport.serializeUser((user, done) =>
  storage.setItem(`user_${user.id}`, user)
    .then(() => done(null, user.id))
);

passport.deserializeUser((id, done) =>
  done(null, storage.getItem(`user_${user.id}`))
);

app.get('/login', passport.authenticate('github'),
  (req, res) =>
    // allow user to publish to open channels
    pubnubHandle.grant(
      {
        channels: [channel],
        channelGroups: [],
        authKeys: [req.user.accessToken],
        ttl: 0,
        read: true,
        write: true,
      },
      status => status.error ?
        res.status(403).send() :
        res.status(200).send()
    )
  );

app.get('/callback',
  passport.authenticate(
    'github',
    { failureRedirect: '/login' }),
  (req, res) => res.redirect(`reactchat://${req.user.accessToken}`)
);

app.get('/user', (req, res) => {
  const user = I.List(storage.values())
    .find(u => u.accessToken === req.query.accessToken);

  if (user) {
    res.status(200).send(formatUser(user._json));
  }
  res.status(404).send();
});

app.get('/friends', (req, res) => {
  const user = I.List(storage.values())
    .find(u => u.accessToken === req.query.accessToken);

  if (user) {
    Promise.all([
      fetch(user._json.followers_url).then(r => r.json()),
      // change lookup link to fetch all 'following' users
      fetch(user._json.following_url.match(/^.+(?={)/)[0]).then(r => r.json())
    ])
    .then(([followers, following]) => {
      // grab unique members of both lists
      const friends = followers.concat(following).reduce(
        (map, f) => map.has(f.id) ? map : map.set(f.id, f),
        I.Map()
      ).toArray();

      // create direct conversation channels
      const friendChannels = createFriendChannels(user, friends);

      pubnubHandle.grant(
        {
          channels: friendChannels,
          channelGroups: [],
          authKeys: [user.accessToken],
          ttl: 0,
          read: true,
          write: true,
          manage: false,
        },
        status => status.error ?
          res.status(403).send(status.error) :
          res.status(200).send(
            friends
              .map(formatUser)
              // create key value pairs
              .reduce((m, u) => { m[u.id] = u; return m; }, {})
          )
      )
    })
  } else {
    res.status(500).send();
  }
});

app.listen(config.port, '0.0.0.0', () => console.log(`Listening on port ${config.port}`));

function formatUser(user) {
  return {
    login: user.login,
    id: user.id,
    avatar_url: user.avatar_url,
  }
}

function createFriendChannels(user, friends) {
  let id1; let id2;

  return friends.map(f => {
    // order the ids so that the channel is unique
    if (user.id < f.id) {
      id1 = user.id; id2 = f.id;
    } else {
      id2 = user.id; id1 = f.id;
    }
    return 'conversation_' + id1 + '_' + id2;
  });
}
