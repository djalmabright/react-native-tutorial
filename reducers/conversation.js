import {fromJS} from 'immutable';

export const initialState = fromJS({
  users: [],
});

export const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
