import {fromJS} from 'immutable';

export const initialState = fromJS({
  messages: [],
});

export const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
