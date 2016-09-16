import {connect} from '../services/pubnub';

export const ADD_USERS = 'ADD_USERS';
export const ADD_HISTORY = 'ADD_HISTORY';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_USER = 'REMOVE_USER';
export const START_TYPING = 'START_TYPING';
export const STOP_TYPING = 'STOP_TYPING';

export const conversationActions = {
  addUsers(identifiers) {
    return {type: ADD_USERS, payload: {identifiers}};
  },

  removeUser(userId) {
    return {type: REMOVE_USER, payload: {userId}};
  },

  startTyping(userId) {
    return {type: START_TYPING, payload: {userId}};
  },

  stopTyping(userId) {
    return {type: STOP_TYPING, payload: {userId}};
  },

  addHistory(messages, timestamp) {
    return {type: ADD_HISTORY, payload: {messages, timestamp}};
  },

  addMessage(message) {
    return {type: ADD_MESSAGE, payload: message};
  }
};
