import {connect, disconnect} from '../services/pubnub';

import {FriendsService} from '../services';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const STORE_FRIENDS = 'STORE_FRIENDS';

const friendsService = new FriendsService();

export const connectionActions = {
  connect(authenticationToken) {
    return dispatch => {
      dispatch({type: CONNECTING});

      let user;

      friendsService.getUser(authenticationToken)
        .then(res => {
          user = res;

          // use github id as pubnub uuid
          return connect(authenticationToken, user.id)
        })
        .then(() => {
          dispatch({type: CONNECTED, payload: user});

          return friendsService.getFriends(authenticationToken);
        })
        .then(friends => {
          dispatch({type: STORE_FRIENDS, payload: friends})
        })
        .catch(error => {
          dispatch({type: DISCONNECTED, payload: {error}});

          // Attempt to reconnect on a timer
          const reconnect = () => connectionActions.connect(authenticationToken)(dispatch);

          setTimeout(reconnect, 1500);
        });
    };
  },

  disconnect() {
    return dispatch => disconnect()
      .then(() => dispatch({type: DISCONNECTED, payload: {}}));
  },

  failure(error) {
    return {type: DISCONNECTED, payload: {error}};
  }
};
