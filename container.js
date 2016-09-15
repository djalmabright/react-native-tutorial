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
      case ConnectionState.Failed:
        return (
          <View>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={true}
                style={styles.center}
                onRequestClose={this.onReconnect.bind(this)}>
              <View style={styles.mt1}>
                <View>
                  <Text>
                    Failed to connect to the PubNub service
                  </Text>
                  <View style={[styles.mt3, styles.mb3]}>
                    <Text style={styles.stackTrace}>
                      {failureTrace}
                    </Text>
                  </View>
                  <TouchableHighlight onPress={this.onReconnect.bind(this)}>
                    <Text style={styles.royalBlue}>Reconnect</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        );
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

    Linking.openURL('http://localhost:8080/login');
  }

  onReconnect() {
    this.props.connect();
  }
}

export const Container = connect(mapStateToProps, mapDispatchToProps)(BareContainer);
