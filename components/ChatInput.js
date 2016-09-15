import React, {Component, PropTypes} from 'react';

import {
  Text,
  View,
  TextInput,
} from 'react-native';

import s from '../styles';

import {MKButton} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ChatInput extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  }

  onChange = () => {}

  render() {
    const { props, onSubmit, onChange } = this;
    const imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';

    const containerStyle = [
      s.flx1,
      s.flxRow,
      s.jcStart,
      s.bgBase,
      s.pv1,
      s.ph2,
      { maxHeight: 135 }
    ];

    return (
      <View style={containerStyle}>
        <View style={[]}>
          <Icon name="message" size={25} color="white" />
        </View>
        <View style={[s.ml1]}>
          <Text style={[s.white]}>Some text</Text>
        </View>
      </View>
    );
  }
}

ChatInput.propTypes = {
  userID: PropTypes.number,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};

export default ChatInput;


