import * as pubnubService from '../services/pubnub';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const connectionActions = {
  connect() {
    return dispatch => {
      dispatch({type: CONNECTING});

      return pubnubService.connect()
        .then(({ uuid }) => {
          dispatch({type: CONNECTED, payload: uuid });
        })
        .catch(error => {
          dispatch({type: DISCONNECTED, payload: {error}});

          // Attempt to reconnect on a timer
          const reconnect = () => connectionActions.connect()(dispatch);

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
