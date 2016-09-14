import {fromJS} from 'immutable';

export const initialState = fromJS({
  /// Users who are connected to the service
  users: [],

  /// Visible message history
  history: [],
});

export const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
