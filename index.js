import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import React, {Component} from 'react';

import {
  AppRegistry,
  View,
  Text
} from 'react-native';

import {Provider} from 'react-redux';

import {configureStore} from './store/configure-store';

const initialState = {};

const store = configureStore(initialState);

class Chat extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Text>Hello World!</Text>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
