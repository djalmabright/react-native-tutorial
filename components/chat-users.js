import React, {Component} from 'react';

import {
  Image,
  ListView,
  RecyclerViewBackedScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {User} from './user';

import {iconSize, styles} from './styles';

export class ChatUsers extends Component {
  userSource = new ListView.DataSource({rowHasChanged: (lhs, rhs) => lhs !== rhs});

  constructor() {
    super();

    this.state = {
      userSource: this.userSource.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {users} = nextProps;

    this.setState({
      userSource: this.userSource.cloneWithRows(users),
    });
  }

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
        <View style={[styles.flex, styles.row]}>
          {users.map(id => <View key={id} style={styles.padding}><User id={id} /></View>)}
        </View>
      </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};