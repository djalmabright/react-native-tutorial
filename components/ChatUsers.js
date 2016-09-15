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
import User from './User';

import s from '../styles';

class ChatUsers extends Component {
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
      s.flxRow,
      s.jcStart,
      s.ml2,
      s.mt3,
    ];

    const textStyle = [ s.ml1, s.mt2 ];

    return (
      <View style={containerStyle}>
        <View>
          <Icon name="people" size={s.iconSize} />
        </View>
        <View style={textStyle}>
          <Text>{users.length} online</Text>
        </View>
        <View style={[s.flx1, s.flxRow]}>
          {users.map(id => <View key={id} style={s.p3}><User id={id} /></View>)}
        </View>
      </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};

export default ChatUsers;
