import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
} from 'react-native';

import {ChatHistory} from './chat-history';
import {ChatTyping} from './chat-typing';
import {ChatUsers} from './chat-users';
import {styles} from './styles';

const mapStateToProps =
  state => ({
    history: state.conversation.get('history').toJS(),
    users: state.conversation.get('users').toJS(),
  });

export class UnconnectedConversation extends Component {
  render() {
    const {history, users} = this.props;

    const containerStyle = [
      styles.flex,
      styles.column,
      styles.conversation,
    ];

    return (
      <View style={containerStyle}>
        <ChatUsers users={users} />
        <ChatHistory history={history} fetchHistory={this.fetchHistory.bind(this)} />
        <ChatTyping />
      </View>
    );
  }

  fetchHistory() {
    throw new Error('Not implemented');
  }
}

UnconnectedConversation.propTypes = {
  users: React.PropTypes.array,
};

export const Conversation = connect(mapStateToProps)(UnconnectedConversation);