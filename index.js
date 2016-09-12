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
        <View style={{marginTop: 15}}>
          <Text>Hello World!</Text>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Chat', () => Chat);
