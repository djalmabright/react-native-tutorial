import {fromJS} from 'immutable';

export const initialState = fromJS({});

export const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
