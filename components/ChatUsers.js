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
      s.bgBase,
      s.p1,
      s.pt3,
    ];

    return (
      <View style={containerStyle}>
        <View>
          <Icon name="people" size={s.iconSize} color="white" />
        </View>
        <View style={[s.ml1, s.mt1]}>
          <Text style={s.white}>{users.length} online</Text>
        </View>
        <View style={[s.flxRow, s.ml2]}>
          {users.map(id =>
            <View key={id} style={[s.ml1, s.w2, s.h2, s.rounded6, {overflow: 'hidden'}]}>
              <User id={id} style={[s.w2, s.h2]} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

ChatUsers.propTypes = {
  users: React.PropTypes.array,
};

export default ChatUsers;
