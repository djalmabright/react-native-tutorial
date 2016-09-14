import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import React from 'react';

import {
  AppRegistry,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {Container} from './container';
import {configureStore} from './store/configure-store';

const initialState = {};

const store = configureStore(initialState);

class Chat extends React.Component {
  render() {
    return (
      <View>
        <Provider store={store}>
          <Container />
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
