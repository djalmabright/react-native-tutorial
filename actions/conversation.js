import {connect} from '../services/pubnub';

export const ADD_HISTORY = 'ADD_HISTORY';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const START_TYPING = 'START_TYPING';
export const STOP_TYPING = 'STOP_TYPING';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';

export const conversationActions = {
  startTyping(userId) {
    return {type: START_TYPING, payload: userId};
  },

  stopTyping(userId) {
    return {type: STOP_TYPING, payload: userId};
  },

  addHistory(messages, timestamp) {
    return {type: ADD_HISTORY, payload: {messages, timestamp}};
  },

  clearHistory() {
    return {type: CLEAR_HISTORY};
  },

  addMessage(message) {
    return {type: ADD_MESSAGE, payload: message};
  },

  selectChannel(type, id) {
    return {type: SELECT_CHANNEL, payload: { type, id }};
  }
};
