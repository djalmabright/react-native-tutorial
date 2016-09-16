import React, {Component} from 'react';

import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Linking
} from 'react-native';

import {connect} from 'react-redux';

import {connectionActions} from './actions';
import {ConnectionState} from './constants';
import {AuthenticationService} from './services';

import {Conversation} from './components/Conversation';

import styles from './styles';

const mapStateToProps =
  state => ({
    connectionState: state.connection.get('state'),
    failureTrace: state.connection.get('error'),
  });

const mapDispatchToProps =
  dispatch => ({
    connect: authenticationToken =>
      connectionActions.connect(authenticationToken)(dispatch),
  });

class BareContainer extends Component {
  render() {
    const {connectionState, failureTrace} = this.props;

    switch (connectionState) {
      case ConnectionState.Idle:
        return null;
      case ConnectionState.Connecting:
        return (
          <ActivityIndicator
            animating={true}
            style={[styles.flx1, styles.flxCol, styles.itemsCenter, styles.jcCenter]}
            size='large'
          />
        );
      case ConnectionState.Connected:
        return <Conversation />;
      default:
        throw new Error(`Unknown state: ${connectionState}`);
    }
  }

  componentDidMount() {
    /// This will open up a browser instance that will go through the GitHub login process
    /// and when it is finished, it will bounce back to reactchat://authenticationToken,
    /// which we will extract through our url handler and begin the PubNub connect handshake.
    Linking.addEventListener('url',
      event => {
        this.props.connect(AuthenticationService.getTokenFromUri(event.url));
      });

    Linking.openURL('http://localhost:3000/login');
  }

  onReconnect() {
    this.props.connect();
  }
}

export const Container = connect(mapStateToProps, mapDispatchToProps)(BareContainer);
