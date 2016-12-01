import {Platform} from 'react-native';

import {config as baseConfiguration} from '../config';

const loopbackAddress =
  Platform.OS === 'ios'
    ? baseConfiguration.host.ios
    : baseConfiguration.host.android;

export const config = {
  port: baseConfiguration.port,
  host: `http://${loopbackAddress}:${baseConfiguration.port}`,
  client: {
    publishKey: baseConfiguration.pubnub.publishKey,
    subscribeKey: baseConfiguration.pubnub.subscribeKey,
    ssl: false,
  },
};
