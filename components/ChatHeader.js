import React, {Component, PropTypes} from 'react';

import {
  Image,
  ListView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {User} from './User';

import styles from '../styles';

export class ChatHeader extends Component {
  render() {
    const {props} = this;

    const containerStyle = [
      styles.flxRow,
      styles.jcBetween,
      styles.bgBase,
      styles.p1,
      styles.pt3,
    ];

    const visual = props.channel.type === 'open' ?
      (<Icon name="people" size={styles.iconSize} color="white" />) :
      (<User uri={props.channel.user.avatarUrl} size={40} />);

    return (
      <View style={containerStyle}>
        <View style={[styles.flxRow]}>
         { visual }
          <View style={[styles.ml1, styles.mt1]}>
            <Text style={[styles.white, styles.f4]}>
              {props.channel.display}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
          onPress={props.onMenuClick}>
          <Icon name="menu" size={30} color="white"/>
        </TouchableOpacity>
      </View>
    );
  }
}

ChatHeader.propTypes = {
  channel: PropTypes.object,
  onMenuClick: PropTypes.func,
};
