import React, {Component, PropTypes} from 'react';

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
import {ConnectionState, config} from './constants';

import {Conversation} from './components/Conversation';

import styles from './styles';

const mapStateToProps =
  state => ({
    connectionState: state.connection.get('state'),
    failureTrace: state.connection.get('error'),
  });

const mapDispatchToProps =
  dispatch => ({
    connect:
      () => connectionActions.connect()(dispatch),
    failure:
      error => dispatch(connectionActions.failure()),
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
          <View style={styles.m3}>
            <Text>Failed to connect, reconnecting in 1s</Text>
            <View style={styles.p1}>
              <Text style={styles.stackTrace}>{failureTrace}</Text>
            </View>
          </View>
        );
      default:
        throw new Error(`Unknown state: ${connectionState}`);
    }
  }

  componentDidMount() {
    this.props.connect();
  }

  onReconnect() {
    this.props.connect();
  }
}

BareContainer.PropTypes = {
  connectionState: PropTypes.object,
  failureTrace: PropTypes.object,
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(BareContainer);
