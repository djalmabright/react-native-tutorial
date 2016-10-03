import {config} from '../constants';

export class api {
  static getUser(accessToken) {
    return fetch(config.host + '/user?accessToken=' + accessToken)
      .then(res => res.json());
  }
}
