import {connect} from '../services/pubnub';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const START_TYPING = 'START_TYPING';
export const STOP_TYPING = 'STOP_TYPING';

export const conversationActions = {
  addUser(userId) {
    return {type: ADD_USER, payload: {userId}};
  },

  removeUser(userId) {
    return {type: REMOVE_USER, payload: {userId}};
  },

  startTyping(userId) {
    return {type: START_TYPING, payload: {userId}};
  },

  stopTyping(userId) {
    return {type: STOP_TYPING, payload: {userId}};
  }
};
