import {combineReducers} from 'redux';

import {contactsReducer} from './contacts';
import {conversationReducer} from './conversation';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  conversation: conversationReducer,
});
