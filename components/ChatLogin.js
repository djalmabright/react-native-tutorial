import React, {Component, PropTypes} from 'react';

import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import s from '../styles';

export class ChatLogin extends Component {
  render() {
    const {props} = this;
    return (
      <View style={[s.flx1, s.flxRow, s.selfStretch, s.bgWhite, s.jcCenter]}>
        <TouchableOpacity style={[s.rounded1, s.selfCenter, s.p2, s.bgBase]}
          activeOpacity={0.5}
          onPress={props.onSubmit}>
          <View style={[s.flxRow]}>
            <Icon name="vpn-key" size={25} color="white" />
            <Text style={[s.white, s.f3, s.ml1]}>Login with GitHub</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
