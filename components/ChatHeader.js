import React, {Component, PropTypes} from 'react';

import {
  Image,
  ListView,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import User from './User';

import s from '../styles';

export default class ChatHeader extends Component {
  render() {
    const {props} = this;

    const containerStyle = [
      s.flxRow,
      s.jcBetween,
      s.bgBase,
      s.p1,
      s.pt3,
    ];

    const visual = props.channel.type === 'open' ?
      (<Icon name="people" size={s.iconSize} color="white" />) :
      (<User uri={props.channel.user.avatar_url} size={40} />);

    return (
      <View style={containerStyle}>
        <View style={[s.flxRow]}>
         { visual }
          <View style={[s.ml1, s.mt1]}>
            <Text style={[s.white, s.f4]}>
              {props.channel.display}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ChatHeader.propTypes = {
  channel: PropTypes.object,
  onMenuClick: PropTypes.func,
};
