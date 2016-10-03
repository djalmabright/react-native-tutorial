import React, {Component} from 'react';

import {
  AppRegistry,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {configureStore} from './store/configure-store';
import {Container} from './container';

import styles from './styles';

const initialState = {};

const store = configureStore(initialState);

class Chat extends React.Component {
  render() {
    return (
      <View style={[styles.flx1, styles.selfStretch]}>
        <Provider store={store}>
          <Container />
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
