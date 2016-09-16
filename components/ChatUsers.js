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

import {User} from './User';

import styles from '../styles';

export class ChatUsers extends Component {
  constructor() {
    super();

    this.userSource = new ListView.DataSource({rowHasChanged: (lhs, rhs) => lhs !== rhs});

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
      styles.flxRow,
      styles.jcStart,
      styles.bgBase,
      styles.p1,
      styles.pt3,
    ];

    return (
      <View style={containerStyle}>
        <View>
          <Icon name="people" size={styles.iconSize} color="white" />
        </View>
        <View style={[styles.ml1, styles.mt1]}>
          <Text style={styles.white}>
            {users.length} online
          </Text>
        </View>
        <View style={[styles.flxRow, styles.ml2]}>
          {users.map(id =>
            <View key={id} style={[styles.ml1, styles.w2, styles.h2, styles.rounded6, {overflow: 'hidden'}]}>
              <User id={id} style={[styles.w2, styles.h2]} />
            </View>)}
        </View>
      </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};
