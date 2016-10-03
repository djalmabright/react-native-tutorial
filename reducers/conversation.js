import {OrderedSet, Map, List, fromJS} from 'immutable';
import {channel} from '../constants';

import * as actions from '../actions';

import {
  ADD_HISTORY,
  CLEAR_HISTORY,
  ADD_MESSAGE,
  CONNECTED,
  START_TYPING,
  STOP_TYPING,
} from '../actions';

export const initialState = fromJS({
  userId: '',

  // Users who are typing
  typingUsers: Map(),

  // Visible message history
  history: List(),

  selectedChannel: {
    type: 'open', // type of channel. open | direct
    name: channel, // channel name for pubnub api
    display: channel, // channel display for view
    user: null, // only required for 'direct' channel
  },

  lastMessageTimestamp: 0,
});

export const conversationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CONNECTED:
      return state.set('userId', payload);

    case START_TYPING:
      return state.setIn(['typingUsers', payload], payload);

    case STOP_TYPING:
      return state.deleteIn(['typingUsers', payload]);

    case ADD_HISTORY:
      return state
        .update('history', (messages) => messages.unshift(...payload.messages.map(msg => msg.entry)))
        .set('lastMessageTimestamp', payload.timestamp);

    case ADD_MESSAGE:
      return state.update('history', messages => messages.push(payload));

    default:
      return state;
  }
};
