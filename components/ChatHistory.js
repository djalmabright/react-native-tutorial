import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import s from '../styles';

class ChatHistory extends Component {
  render() {
    return (
      <View style={[s.flx2, s.flxRow, s.selfStretch, s.p2]}>
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

export default ChatHistory;
