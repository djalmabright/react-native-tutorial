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
      if (state.get('user').id === payload) {
        return state.update('typingUsers', t => t.set(payload, state.get('user')));
      } else {
        return state.update(
          'typingUsers',
          t => t.set(payload, state.getIn(['friends', payload]))
        );
      }

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
          name: createFriendChannel(state.get('user').id, payload.id.toString()),
          display: 'Private conversation with ' + user.login,
          user }
      );

    case STOP_TYPING:
      return state.update('typingUsers', t => t.delete(payload));

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


function createFriendChannel(userId, friendId) {
  let id1; let id2;

  if (userId < friendId) {
    id1 = userId; id2 = friendId;
  } else {
    id2 = userId; id1 = friendId;
  }
  return 'conversation_' + id1 + '_' + id2;
}
