import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text
} from 'react-native';

import {ChatUsers} from './chat-users';

const mapStateToProps =
  state => ({
    users: state.conversation.get('users').toJS(),
  });

export class UnconnectedConversation extends Component {
  render() {
    const {users} = this.props;

    return (
      <View>
        <ChatUsers users={users} />
      </View>
    );
  }
}

UnconnectedConversation.propTypes = {
  users: React.PropTypes.array,
};

export const Conversation = connect(mapStateToProps)(UnconnectedConversation);