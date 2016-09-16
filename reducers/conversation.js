import {OrderedSet, List, fromJS} from 'immutable';

import {
  ADD_USERS,
  ADD_HISTORY,
  ADD_MESSAGE,
  REMOVE_USER,
  START_TYPING,
  STOP_TYPING,
} from '../actions';

export const initialState = fromJS({
  /// Users who are connected to the service (IDs)
  users: OrderedSet(),

  /// Users who are typing
  typingUsers: OrderedSet(),

  /// Visible message history
  history: List(),

  lastMessageTimestamp: 0,
});

export const conversationReducer = (state = initialState, action) => {
  const {userId} = (action.payload || {});

  switch (action.type) {
    case ADD_USERS:
      return state.set('users', state.get('users').concat(action.payload.identifiers));

    case REMOVE_USER:
      return state.update('users', users => users.delete(userId));

    case START_TYPING:
      return state.update('typingUsers', typingUsers => typingUsers.add(userId));

    case STOP_TYPING:
      return state.update('typingUsers', typingUsers => typingUsers.delete(userId));

    case ADD_HISTORY:
      return state
        .update('history', (messages) => messages.unshift(...action.payload.messages.map(msg => msg.entry)))
        .set('lastMessageTimestamp', action.payload.timestamp);

    case ADD_MESSAGE:
      return state.update('history', messages => messages.push(action.payload));

    default:
      return state;
  }
};
