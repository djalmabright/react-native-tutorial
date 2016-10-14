import {config} from '../constants';

export class FriendsService {
  getUser(accessToken) {
    return fetch(`${config.host}/user?accessToken=${accessToken}`)
      .then(res => res.json());
  }

  getFriends(accessToken) {
    return fetch(`${config.host}/friends?accessToken=${accessToken}`)
      .then(res => res.json());
  }
}
