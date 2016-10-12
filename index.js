import React, {Component} from 'react';

import {
  AppRegistry,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {configureStore} from './store/configure-store';

import {Container} from './container';

const initialState = {};

const store = configureStore(initialState);

class Chat extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
