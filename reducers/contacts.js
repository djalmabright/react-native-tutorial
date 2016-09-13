import {fromJS} from 'immutable';

export const initialState = fromJS({
  contacts: [],
});

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
