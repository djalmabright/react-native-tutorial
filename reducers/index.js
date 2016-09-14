import {combineReducers} from 'redux';

import {connectionReducer} from './connection';
import {contactsReducer} from './contacts';
import {conversationReducer} from './conversation';

export const rootReducer = combineReducers({
  connection: connectionReducer,
  contacts: contactsReducer,
  conversation: conversationReducer,
});
