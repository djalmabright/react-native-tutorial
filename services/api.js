import { Platform } from 'react-native';

let config;
if (Platform.OS === 'ios') {
  config = require('../constants/configuration.ios').config;
} else {
  config = require('../constants/configuration.android').config;
}

export class api {
  static getUser(accessToken) {
    return fetch(config.host + '/user?accessToken=' + accessToken)
      .then(res => res.json());
  }
  static getFriends(accessToken) {
    return fetch(config.host + '/friends?accessToken=' + accessToken)
      .then(res => res.json());
  }
}
