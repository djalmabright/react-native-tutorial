import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import {styles} from './styles';

export class ChatHistory extends Component {
  render() {
    return (
      <View style={[styles.history, styles.padding]}>
        <ScrollView>
          <Text>Chat history here</Text>
        </ScrollView>
      </View>
    );
  }
}

ChatHistory.propTypes = {
  history: React.PropTypes.array,
  fetchHistory: React.PropTypes.func,
};