import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
} from 'react-native';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatUsers from './ChatUsers';

import s from '../styles';
import {conversationActions} from '../actions';

import * as pubnub from '../services/pubnub';

const channel = 'ReactChat';

export class UnconnectedConversation extends Component {
  render() {
    const {history, users} = this.props;

    const containerStyle = [
      s.flx1,
      s.flxCol,
      s.selfStretch,
    ];

    return (
      <View style={containerStyle}>
        <ChatUsers users={users} />
        <ChatHistory history={history} fetchHistory={this.fetchHistory.bind(this)} />
        <ChatInput />
      </View>
    );
  }

  componentDidMount() {
    this.subscription = pubnub.subscribe(
      channel,
      this.onPresenceChange.bind(this),
      this.onMessageReceived.bind(this)
    );
    this.fetchHistory();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      delete this.subscription;
    }
  }

  onMessageReceived(message) {
  }

  onPresenceChange(presenceData) {
    switch (presenceData.action) {
      case 'join':
        this.props.addUser(presenceData.uuid);
        break;
      case 'leave':
      case 'timeout':
        this.props.removeUser(presenceData.uuid);
        break;
      case 'state-change':
        if (presenceData.state) {
          if (presenceData.state.isTyping === true) {
            this.props.startTyping(presenceData.uuid);
          }
          else {
            this.props.stopTyping(presenceData.uuid);
          }
        }
        break;
      default:
        break;
    }
  }

  fetchHistory() {
    const { props } = this;

    pubnub.history(
      channel,
      props.lastMessageTimestamp,
      (status, response) => {
        // index0 is an array of messages
        // index1 is the start date of the messages
        // props.addHistory(data[0], data[1])
      }
    );
  }
}

UnconnectedConversation.propTypes = {
  users: PropTypes.array,
  typingUsers: PropTypes.array,
  history: PropTypes.array,
  lastMessageTimestamp: PropTypes.string,
};

const mapStateToProps = state => state.conversation.toJS();
const mapDispatchToProps = conversationActions;

//const mapDispatchToProps = dispatch => ({
  //addUser: userId => dispatch(conversationActions.addUser(userId)),
  //removeUser: userId => dispatch(conversationActions.removeUser(userId)),
  //startTyping: userId => dispatch(conversationActions.startTyping(userId)),
  //stopTyping: userId => dispatch(conversationActions.stopTyping(userId)),
//});

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedConversation);
