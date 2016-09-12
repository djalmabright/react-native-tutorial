import {combineReducers} from 'redux';

import {connectionReducer} from './connection';

export const rootReducer = combineReducers({
  connection: connectionReducer,
});
