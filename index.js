import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import React, {Component} from 'react';

import {
  AppRegistry,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {Container} from './container';
import {configureStore} from './store/configure-store';

import {styles} from './components/styles';

const initialState = {};

const store = configureStore(initialState);

class Chat extends React.Component {
  render() {
    return (
      <View style={styles.application}>
        <Provider store={store}>
          <Container />
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
