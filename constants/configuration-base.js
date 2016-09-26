export const channel = 'ReactChat';

export const commonConfiguration = {
  publishKey: 'pub-c-52fbe46d-e262-4034-91ae-c9495b7550e6',
  subscribeKey: 'sub-c-25ff9f44-7f85-11e6-8a0d-0619f8945a4f',
  ssl: false,
};

const config = {
  port: 3000,
  client: commonConfiguration,
  server: Object.assign({
    secretKey: 'sec-c-ZjZkMzJiYzgtMTdhNC00MmZjLWIxNDEtMDVlNTkxZTQyOTkz',
    authKey: 'server-auth',
  }, commonConfiguration),
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
