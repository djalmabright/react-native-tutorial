import React from 'react';

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
import {Conversation} from './components/conversation';

const mapStateToProps =
  state => ({
    connectionState: state.connection.get('state'),
    failureTrace: state.connection.get('error'),
  });

const mapDispatchToProps =
  dispatch => ({
    connect: () => connectionActions.connect()(dispatch),
  });

class BareContainer extends React.Component {
  render() {
    return (
      <View style={this.containerStyle()}>
        {this.renderChat()}
      </View>
    );
  }

  componentDidMount() {
    this.props.connect();
  }

  renderChat() {
    const {connectionState, failureTrace} = this.props;

    const center = {alignItems: 'center', justifyContent: 'center'};

    switch (connectionState) {
      case ConnectionState.Idle:
        return null;
      case ConnectionState.Connecting:
        return (
          <ActivityIndicator
            animating={true}
            style={center}
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
                style={center}
                onRequestClose={this.onReconnect.bind(this)}>
              <View style={{marginTop: 30}}>
                <View>
                  <Text>
                    Failed to connect to the PubNub service
                  </Text>
                  <View style={{margin: 20}}>
                    <Text style={{fontFamily: 'Courier', fontSize: 10, color: 'red'}}>
                      {failureTrace}
                    </Text>
                  </View>
                  <TouchableHighlight onPress={this.onReconnect.bind(this)}>
                    <Text style={{color: 'royalblue'}}>Reconnect</Text>
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

  containerStyle() {
    return {marginTop: 30};
  }

  onReconnect() {
    this.props.connect();
  }
}

export const Container =
  connect(mapStateToProps, mapDispatchToProps)(BareContainer);
