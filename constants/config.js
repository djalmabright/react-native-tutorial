import { Platform } from 'react-native';

const loopbackAddress = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const config = {
  port: 3000,
  host: `http://${loopbackAddress}:3000`,
  client: {
    publishKey: 'pub-c-52fbe46d-e262-4034-91ae-c9495b7550e6',
    subscribeKey: 'sub-c-25ff9f44-7f85-11e6-8a0d-0619f8945a4f',
    ssl: false,
  },
};
