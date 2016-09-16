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

          // Attempt to reconnect on a timer
          setTimeout(() => {
            debugger;
            connectionActions.connect(authenticationToken)(dispatch);
          }, 1500);
        });
    };
  },

  disconnect() {
    return dispatch => {
      disconnect().then(() => dispatch({type: DISCONNECTED}));
    };
  },

  failure(error) {
    return {type: DISCONNECTED, payload: {error}};
  }
};
