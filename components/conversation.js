import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
} from 'react-native';

import {ChatHistory} from './ChatHistory';
import {ChatInput} from './ChatInput';
import {ChatUsers} from './ChatUsers';

import {conversationActions} from '../actions';

import {
  subscribe,
  history,
} from '../services/pubnub';

import styles from '../styles';

const channel = 'ReactChat';

class BareConversation extends Component {
  render() {
    const {
      currentUserId,
      history,
      users,
    } = this.props;

    const containerStyle = [
      styles.flx1,
      styles.flxCol,
      styles.selfStretch,
    ];

    return (
      <View style={containerStyle}>
        <ChatUsers users={users} />
        <ChatHistory history={history} fetchHistory={this.fetchHistory.bind(this)} />
        <ChatInput currentUserId={currentUserId} />
      </View>
    );
  }

  componentDidMount() {
    this.subscription = subscribe(
      channel,
      p => this.onPresenceChange(p),
      m => this.onMessageReceived(m));

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
    history(channel).then(({status, response}) => {
      debugger;
    })
  }
}

BareConversation.propTypes = {
  users: PropTypes.array,
  typingUsers: PropTypes.array,
  history: PropTypes.array,
  lastMessageTimestamp: PropTypes.string,
};

const mapStateToProps = state =>
  Object.assign({}, state.conversation.toJS(), {
    currentUserId: state.connection.get('currentUserId'),
  });

export const Conversation = connect(mapStateToProps, conversationActions)(BareConversation);
