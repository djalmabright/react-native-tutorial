import React, {Component, PropTypes} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import {MKButton} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from './User';

import s from '../styles';

const Fab = MKButton.plainFab()
  .withBackgroundColor('#26a69a')
  .withStyle([ s.w3, s.h3, s.rounded, s.border0 ])
  .build();

export default class ChatInput extends Component {
  constructor() {
    super();

    this.reset();
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
    const {props, state} = this;
    const value = state.value;
    if (value.length === 0) {
      return;
    }

    const messageObj = {
      Who: props.user,
      What: value,
      When: new Date().valueOf(),
    };

    props.setTypingState(false);
    props.publishMessage(messageObj);

    this.reset();
  }

  render() {
    const containerStyle = [
      s.flx1,
      s.flxCol,
      s.bgBase,
      s.pv1,
      s.ph2,
      {maxHeight: 115},
    ];

    const inputStyle = [
      s.white,
      s.h3,
      s.f5,
      s.p0,
      s.m0,
      {width: 220, borderBottomWidth: 0},
    ];

    const {user} = this.props;

    return (
      <View style={containerStyle}>
        <View style={[s.flxRow, s.jcStart]}>
          <View style={[s.mt1]}>
            <Icon name="message" size={30} color="white" />
          </View>
          <View style={[s.h3, s.mh2, s.borderBHl]}>
            <TextInput ref="input"
              style={{borderBottomColor: 'white'}}
              placeholder="Type your message" placeholderTextColor="#ccc"
              style={inputStyle}
              onChangeText={text => this.onChangeText(text)} />
          </View>
          <Fab onPress={() => this.onSubmit()}>
            <Icon name="send" size={25} color="white" />
          </Fab>
        </View>
        <View style={[s.mt2, s.flxRow, s.rounded6, s.bgSilver, s.h2, {width: 130}]}>
          <User uri={user.avatar_url} size={32} />
          <View style={[s.ml1]}>
            <Text style={[s.black, s.italics, s.f6, {marginTop: 8, fontStyle: 'italic'}]}>
              {user.login}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  reset() {
    const initialState = {value: new String().valueOf()};
    if (this.state) {
      this.setState(initialState);
    }
    else {
      this.state = initialState;
    }

    if (this.refs.input) {
      this.refs.input.clear();
    }
  }
}

ChatInput.propTypes = {
  user: PropTypes.object,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};
