import React, {Component, PropTypes} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import {MKButton} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {User} from './User';

import styles from '../styles';

const Fab = MKButton.plainFab()
  .withBackgroundColor('#26a69a')
  .withStyle([ styles.w3, styles.h3, styles.rounded, styles.border0 ])
  .build();

export class ChatInput extends Component {
  constructor() {
    super();

    this.state = {value: ''};
  }

  onChangeText(text) {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }

    const {setTypingState} = this.props;

    if (text == null || text.length === 0) {
      setTypingState(false);
    }
    else {
      this.timeout = setTimeout(() => setTypingState(false), 1500);

      setTypingState(true);
    }

    this.setState({value: text});
  }

  onSubmit(e) {
    const value = this.state.value;
    if (value.length === 0) {
      return;
    }

    const messageObj = {
      Who: this.props.currentUserId,
      What: value,
      When: new Date().valueOf(),
    };

    this.props.publishMessage(messageObj);
    this.setState({ value: '' });
    this.refs.input.clear();
  }

  render() {
    const containerStyle = [
      styles.flx1,
      styles.flxCol,
      styles.bgBase,
      styles.pv1,
      styles.ph2,
      {maxHeight: 115},
    ];

    const inputStyle = [
      styles.white,
      styles.h3,
      styles.f5,
      styles.p0,
      styles.m0,
      {width: 220},
    ];

    const {currentUserId} = this.props;

    return (
      <View style={containerStyle}>
        <View style={[styles.flxRow, styles.jcStart]}>
          <View style={[styles.mt1]}>
            <Icon name="message" size={30} color="white" />
          </View>
          <View style={[styles.h3, styles.mh2, styles.borderBHl, { borderBottomColor: 'white' }]}>
            <TextInput ref="input"
              placeholder="Type your message" placeholderTextColor="#ccc"
              style={inputStyle}
              onChangeText={text => this.onChangeText(text)}
            />
          </View>
          <Fab onPress={() => this.onSubmit()}>
            <Icon name="send" size={25} color="white" />
          </Fab>
        </View>
        <View style={[styles.mt2, styles.flxRow, styles.rounded6, styles.bgSilver, styles.h2, {width: 120}]}>
          <View style={[styles.rounded6, styles.w2, styles.h2, { overflow: 'hidden' }]}>
            <User id={currentUserId} />
          </View>
          <View style={[styles.ml1]}>
            <Text style={[styles.black, styles.italics, styles.f6, {marginTop: 10, fontStyle: 'italic'}]}>
              {currentUserId}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ChatInput.propTypes = {
  currentUserId: PropTypes.string,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};
