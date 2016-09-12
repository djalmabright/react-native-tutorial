import { Platform } from 'react-native';

const loopbackAddress = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const config = {
  port: 3000,
  host: `http://${loopbackAddress}:3000`,
  client: {
    publishKey: '',
    subscribeKey: '',
    ssl: false,
  },
};
