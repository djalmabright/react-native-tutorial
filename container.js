import React, {Component} from 'react';

import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {connect} from 'react-redux';

import {connectionActions} from './actions';
import {ConnectionState} from './constants';
import {
  Conversation,
  styles,
} from './components';

const mapStateToProps =
  state => ({
    connectionState: state.connection.get('state'),
    failureTrace: state.connection.get('error'),
  });

const mapDispatchToProps =
  dispatch => ({
    connect: () => connectionActions.connect()(dispatch),
  });

class BareContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.renderChat()}
      </View>
    );
  }

  componentDidMount() {
    this.props.connect();
  }

  renderChat() {
    const {connectionState, failureTrace} = this.props;

    switch (connectionState) {
      case ConnectionState.Idle:
        return null;
      case ConnectionState.Connecting:
        return (
          <ActivityIndicator
            animating={true}
            style={styles.center}
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
              <View style={styles.marginTop}>
                <View>
                  <Text>
                    Failed to connect to the PubNub service
                  </Text>
                  <View style={styles.vmargin}>
                    <Text style={styles.stackTrace}>
                      {failureTrace}
                    </Text>
                  </View>
                  <TouchableHighlight onPress={this.onReconnect.bind(this)}>
                    <Text style={styles.button}>Reconnect</Text>
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

  onReconnect() {
    this.props.connect();
  }
}

export const Container =
  connect(mapStateToProps, mapDispatchToProps)(BareContainer);
