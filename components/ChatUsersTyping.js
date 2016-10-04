import React, {Component} from 'react';

import {
  View,
  Text,
} from 'react-native';

const Spinner = require('react-native-spinkit');

import {User} from './User';

import styles from '../styles';

export class ChatUsersTyping extends Component {
  render() {
    const {users} = this.props;

    const itemStyle = [
      styles.flxRow,
      styles.rounded6,
      styles.bgSilver,
      styles.h2,
      styles.itemsCenter,
      styles.jcCenter,
      {left: 5, top: -5}
    ];

    return (
      <View style={[{flex: 0}, styles.flxRow]}>
        {users.map(user =>
          <View key={user.id} style={itemStyle}>
            <User uri={user.avatarUrl} size={32}/>
            <View style={[styles.ml1]}>
              <Text style={[styles.black, styles.italics, styles.f6, {fontStyle: 'italic'}]}>
                {user.login}
              </Text>
            </View>
            <View style={{ marginTop: -5, marginLeft: 8, marginRight: 10}}>
              <Spinner type="ThreeBounce" />
            </View>
          </View>)}
      </View>
    );
  }
}

ChatUsersTyping.propTypes = {
  users: React.PropTypes.array,
};
