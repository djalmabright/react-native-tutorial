import React, {Component} from 'react';

import {
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from './styles';

export class ChatUsers extends Component {
  render() {
    const {users} = this.props;

    return (
        <View style={[styles.users, styles.marginLeft]}>
          <View>
            <Icon name="people" size={50} />
          </View>
          <View style={[styles.marginTop, styles.marginLeft]}>
            <Text>{users.length} online</Text>
          </View>
        </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};