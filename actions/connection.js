import {connect} from '../services/pubnub';

export const CONNECTING = 'CONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const connectionActions = {
  connect(authenticationToken) {
    return dispatch => {
      dispatch({type: CONNECTING});

      connect(authenticationToken)
        .then(({ uuid }) => {
          dispatch({type: CONNECTED, payload: {userId: uuid}});
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
