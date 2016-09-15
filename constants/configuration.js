export const commonConfiguration = {
  publishKey: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
  subscribeKey: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
  ssl: false,
};

export const config = {
  host: 'http://localhost:8080',
  port: 8080,
  client: commonConfiguration,
  server: Object.assign({}, commonConfiguration, {
    secretKey: '',
    authKey: '',
    ssl: false,
  }),
  github: {
    clientID: '4591e867f77e815d446e',
    clientSecret: 'a96497bed46dd07786b9b2fff16d59e25c9758cc',
  },
};
