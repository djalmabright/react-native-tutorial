export const config = {
  port: 3000,
  host: {
    android: '10.0.3.2',
    ios: 'localhost',
  },
  pubnub: {
    authKey: 'server-auth',
    subscribeKey: 'sub-c-25ff9f44-7f85-11e6-8a0d-0619f8945a4f',
    publishKey: 'pub-c-52fbe46d-e262-4034-91ae-c9495b7550e6',
    secretKey: 'sec-c-ZjZkMzJiYzgtMTdhNC00MmZjLWIxNDEtMDVlNTkxZTQyOTkz',
  },
  github: {
    android: {
      clientId: '22ef2f2ea7fc5cf1d125',
      clientSecret: 'c965f686a901a338a81d6a50f81aad750705a328',
    },
    ios: {
      clientId: '4591e867f77e815d446e',
      clientSecret: 'a96497bed46dd07786b9b2fff16d59e25c9758cc',
    },
  },
};

