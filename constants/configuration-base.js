export const channel = 'ReactChat';

export const commonConfiguration = {
  publishKey: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
  subscribeKey: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
  ssl: false,
};

const config = {
  port: 3000,
  client: commonConfiguration,
  server: Object.assign({}, commonConfiguration),
  github: {},
};

export const configure = (githubConfig, loopbackAddress) => {
  const github = Object.assign({}, config.github, githubConfig);

  const secretKey = github.clientSecret;

  /// NOTE(cbond): Android and iOS simulators use different IP addresses to refer
  /// to the host machine. On iOS, it's just `localhost', but on Android, it's the
  /// special IP `10.0.2.2'. That is the reason we need to fork these configs a bit.
  const host = `http://${loopbackAddress}:3000`;

  return Object.assign({}, config, {github, host, secretKey});
};
