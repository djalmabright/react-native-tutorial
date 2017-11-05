export const config = {
  port: 3000,
  host: {
    android: '10.0.3.2',
    ios: 'localhost',
  },
  pubnub: {
    authKey: 'server-auth',
    subscribeKey: 'sub-c-6867f9ec-c1cb-11e7-b683-b67c7dbcdd0',
    publishKey: 'pub-c-665f0ca6-59c7-4022-b9e7-d1648fe8c76f'
    secretKey: 'sub-c-6867f9ec-c1cb-11e7-b683-b67c7dbcdd00' 
  },
  github: {
    android: {
      clientId: '22ef2f2ea7fc5cf1d1
      clientSecret: 'c965f686a901a338a81d6a50f81aad750705a328',
    },
    ios: {
      clientId: '4591e867f77e815d446e'
      clientSecret: 'a96497bed46dd07786b9b2fff16d59e25c9758cc',
    },
  },
};

