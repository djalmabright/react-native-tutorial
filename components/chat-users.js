import React, {Component} from 'react';

import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {iconSize, styles} from './styles';

export class ChatUsers extends Component {
  render() {
    const {users} = this.props;

    const containerStyle = [
      styles.row,
      styles.users,
      styles.marginLeft,
      styles.marginTop,
      {flex: 0},
    ];

    const textStyle = [
      styles.marginTop,
      styles.marginLeft,
    ];

    return (
      <View style={containerStyle}>
        <View>
          <Icon name="people" size={iconSize} />
        </View>
        <View style={textStyle}>
          <Text>{users.length} online</Text>
        </View>
      </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};