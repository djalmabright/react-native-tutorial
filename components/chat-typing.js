import React, {Component} from 'react';

import {
  Text,
  View,
} from 'react-native';

import {styles} from './styles';

export class ChatTyping extends Component {
  render() {
    return (
      <View style={[styles.flex, styles.padding]}>
        <Text>List of users who are typing and text input</Text>
      </View>
    );
  }
}

ChatTyping.propTypes = {};