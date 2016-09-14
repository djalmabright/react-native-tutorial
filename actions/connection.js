import {connect} from '../services/pubnub';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const connectionActions = {
  connect() {
    return dispatch => {
      dispatch({type: CONNECTING});

      connect()
        .then(() => {
          dispatch({type: CONNECTED});
        })
        .catch(error => {
          dispatch({type: DISCONNECTED, payload: {error}});
        });
    };
  },

  disconnect() {
    return dispatch => {
      disconnect().then(() => dispatch({type: DISCONNECTED}));
    };
  }
};
