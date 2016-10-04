import {OrderedSet, Map, List, fromJS} from 'immutable';
import {channel} from '../constants';

import {createChannels} from '../services';

import * as actions from '../actions';

import {
  ADD_HISTORY,
  CLEAR_HISTORY,
  ADD_MESSAGE,
  CONNECTED,
  START_TYPING,
  STOP_TYPING,
  STORE_FRIENDS,
  SELECT_CHANNEL,
} from '../actions';

export const initialState = fromJS({
  // github info of logged in user
  user: {},

  // github info of user's friends
  friends: Map(),

  // Users who are connected to the service (IDs)
  users: OrderedSet(),

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
      return state.set('user', payload);

    case STORE_FRIENDS:
      return state.set('friends', Map(payload));

    case START_TYPING:
      return state.setIn(['typingUsers', payload.id], payload);

    case STOP_TYPING:
      return state.deleteIn(['typingUsers', payload.id]);

    case SELECT_CHANNEL:
      if (payload.type === 'open') {
        return state.set(
          'selectedChannel',
          { type: 'open',
            name: payload.id,
            display: payload.id,
            user: null }
        );
      }
      const user = state.getIn(['friends', payload.id.toString()]);
      return state.set(
        'selectedChannel',
        { type: 'direct',
          name: createChannels(state.get('user').id, [payload.id])[0],
          display: 'Private conversation with ' + user.login,
          user }
      );

    case ADD_HISTORY:
      return state
        .update('history', (messages) => messages.unshift(...payload.messages.map(msg => msg.entry)))
        .set('lastMessageTimestamp', payload.timestamp);

    case CLEAR_HISTORY:
      return state.merge({ history: List(), lastMessageTimestamp: 0 });

    case ADD_MESSAGE:
      return state.update('history', messages => messages.push(payload));

    default:
      return state;
  }
};

