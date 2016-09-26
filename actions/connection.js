import * as pubnubService from '../services/pubnub';
import {api} from '../services';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const STORE_FRIENDS = 'STORE_FRIENDS';

export const connectionActions = {
  connect(authenticationToken) {
    return dispatch => {
      dispatch({type: CONNECTING});

      let user;
      api.getUser(authenticationToken)
        .then(res => {
          user = res;
          // use github id as pubnub uuid
          return pubnubService.connect(authenticationToken, user.id)
        })
        .then(() => {
          dispatch({type: CONNECTED, payload: user});
          return api.getFriends(authenticationToken)
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
    return dispatch => pubnubService.disconnect()
      .then(() => dispatch({type: DISCONNECTED, payload: {}}));
  },

  failure(error) {
    return {type: DISCONNECTED, payload: {error}};
  }
};
