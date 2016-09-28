import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import ChatMenu from './ChatMenu';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatUsersTyping from './ChatUsersTyping';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {conversationActions, connectionActions} from '../actions';

import {channel} from '../constants';

import * as pubnubService from '../services/pubnub';

import s from '../styles';

class BareConversation extends Component {
  constructor() {
    super();
    this.state = {
      subscription: null,
      menuOpen: false,
      viewPosition: new Animated.Value(0),
    };
  }

  render() {
    const {props} = this;

    const absStretch = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    // can't use array for Animated.View
    const containerStyle = {
      ...absStretch,
      backgroundColor: 'white',
      transform: [{ translateX: this.state.viewPosition }],
    };

    return (
      <View style={[s.flx1, s.flxCol, s.selfStretch]}>
        <ChatMenu style={absStretch}
          channels={props.channels}
          friends={props.friends}
          signOut={props.disconnect}
          selectChannel={(id) => {
            props.selectChannel('open', id );
            this.onMenuClick();
          }}
          selectFriend={(id) => {
            props.selectChannel('direct', id);
            this.onMenuClick();
          }}/>
        <Animated.View style={containerStyle}>
          <ChatHeader
            channel={props.selectedChannel}
            onMenuClick={this.onMenuClick}/>
          <ChatHistory ref="chatHistory" history={props.history} fetchHistory={() => this.fetchHistory()} />
          <ChatUsersTyping users={props.typingUsers} />
          <ChatInput
            user={props.user}
            setTypingState={typing => this.onTypingStateChanged(typing)}
            publishMessage={message => this.onPublishMessage(message)} />
        </Animated.View>
      </View>
    );
  }

  componentDidMount() {
    this.subscribeToChannel();
    this.fetchHistory();
  }

  componentDidUpdate(prevProps) {
    const {props} = this;

    if (props.selectedChannel.name !== prevProps.selectedChannel.name) {
      Promise.resolve(props.clearHistory())
        .then(() => {
          this.subscribeToChannel();
          this.fetchHistory();
        });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.state.subscription.unsubscribe();
      this.setState({ subscription: null });
    }
  }

  subscribeToChannel = () => {
    const channel = this.props.selectedChannel.name;

    if (this.state.subscription) {
      this.state.subscription.unsubscribe();

    }
    this.setState({
      subscription: pubnubService.subscribe(
        channel,
        p => this.onPresenceChange(p),
        m => this.onMessageReceived(m)
      )
    });
  }

  fetchHistory = () => {
    const {lastMessageTimestamp, selectedChannel, addHistory} = this.props;

    pubnubService.history(selectedChannel.name, lastMessageTimestamp).then(response => {
      // make sure we're not duplicating our existing history
      if (response.messages.length > 0 &&
          lastMessageTimestamp !== response.startTimeToken) {
        addHistory(response.messages, response.startTimeToken)
      }
    });
  }

  onMenuClick = () => {
    const toValue = this.state.menuOpen ?
      0 : -1 * (Dimensions.get('window').width - 40);

    this.setState({ menuOpen: !this.state.menuOpen }, () =>
      Animated.timing(
        this.state.viewPosition,
        { toValue, easing: Easing.inOut(Easing.ease) }
      ).start()
    );
  }

  onTypingStateChanged(typing) {
    const {props} = this;
    if (typing) {

      props.startTyping(props.user.id);
    }
    else {
      props.stopTyping(props.user.id);
    }

    pubnubService.publishTypingState(props.user.id, typing);
  }

  onMessageReceived(obj) {
    this.props.addMessage(obj.message);

    // scroll down to new message after it's added to history
    setTimeout(() =>
      this.refs.chatHistory.scrollToBottom(),
    0);
  }

  onPresenceChange(presenceData) {
    const {props} = this;

    switch (presenceData.action) {
      case 'join':
        break;
      case 'leave':
      case 'timeout':
        break;
      case 'state-change':
        if (presenceData.state) {
          if (presenceData.state.isTyping === true) {
            props.startTyping(presenceData.uuid);
          }
          else {
            props.stopTyping(presenceData.uuid);
          }
        }
        break;
      default:
        break;
    }
  }

  onPublishMessage = (message) => {
    const channel = this.props.selectedChannel.name;

    pubnubService.publishMessage(channel, message)
      .catch(error => {
        console.error('Failed to publish message:', error);
      });
  }
}

BareConversation.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.array,
  friends: PropTypes.array,
  typingUsers: PropTypes.array,
  history: PropTypes.array,
  selectedChannel: PropTypes.object,
  lastMessageTimestamp: PropTypes.number,
};

const mapStateToProps = state =>
  Object.assign({},
    state.conversation.toJS(),
    {
      friends: state.conversation.get('friends').toArray(), // <k,v> -> [v]
      typingUsers: state.conversation.get('typingUsers').toArray(), // <k,v> -> [v]
      channels: [channel]
    }
  );

export default connect(
  mapStateToProps,
  {...conversationActions,
   disconnect: connectionActions.disconnect}
)(BareConversation);

