import {combineReducers} from 'redux';

import {connectionReducer} from './connection';

import {conversationReducer} from './conversation';

export const rootReducer = combineReducers({
  connection: connectionReducer,
  conversation: conversationReducer,
});