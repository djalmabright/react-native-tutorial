import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import styles from '../styles';

export class ChatHistory extends Component {
  render() {
    return (
      <View style={[styles.flx2, styles.flxRow, styles.selfStretch, styles.p2]}>
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