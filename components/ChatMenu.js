import React, {Component, PropTypes} from 'react';

import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';

import User from './User';
import Icon from 'react-native-vector-icons/MaterialIcons';

import s from '../styles';

const renderChannel = (selectChannel) => (channel) => {
  return (
    <TouchableOpacity style={[s.p2]}
      activeOpacity={0.6}
      onPress={() => selectChannel(channel)}>
      <View style={[s.flxRow]}>
        <Icon name="message" size={30} color="white" />
        <Text style={[s.silver, s.ml2, {marginTop: 6}]}>{ channel }</Text>
      </View>
    </TouchableOpacity>
  )
};

const renderFriend = (selectFriend) => (friend) => {
  return (
    <TouchableOpacity style={[s.p2]}
      activeOpacity={0.6}
      onPress={() => selectFriend(friend.id)}>
      <View style={[s.flxRow]}>
        <User uri={friend.avatar_url} size={32} />
        <View style={[s.ml2, {marginTop: 6}]}>
          <Text style={[s.silver]}>{friend.login}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default class ChatMenu extends Component {
  constructor(props) {
    super();

    this.channelsDataSource = new ListView.DataSource({
      rowHasChanged: (lhs, rhs) => lhs !== rhs
    });

    this.friendsDataSource = new ListView.DataSource({
      rowHasChanged: (lhs, rhs) => lhs !== rhs
    });
  }

  render() {
    const {props} = this;

    const channels = this.channelsDataSource.cloneWithRows(props.channels);
    const friends = this.friendsDataSource.cloneWithRows(props.friends);

    return (
      <View style={[s.flx1, s.flxCol, s.selfStretch, s.pt3, s.ph3, s.ml2, s.bgNavy]}>
        <TouchableOpacity style={[s.mb3, s.pl2]}
          activeOpacity={0.6}
          onPress={props.signOut}>
          <View style={[s.flxRow]}>
            <Icon name="power-settings-new" size={25} color="white" />
            <Text style={[s.silver, s.ml1, {marginTop: 6}]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <ListView style={[s.mb3, s.flx1]}
          dataSource={channels}
          renderHeader={() =>  (<Text style={[s.silver, s.pl2, s.f3]}>Channels</Text>)}
          renderRow={renderChannel(props.selectChannel)}/>
        <ListView style={[s.flx2]}
          enableEmptySections
          dataSource={friends}
          renderHeader={() => (<Text style={[s.silver, s.pl2, s.f3]}>Friends</Text>)}
          renderRow={renderFriend(props.selectFriend)}/>
      </View>
    );
  }
}

ChatMenu.propTypes = {
  channels: PropTypes.array,
  friends: PropTypes.array,
  signOut: PropTypes.func,
  selectChannel: PropTypes.func,
  selectFriend: PropTypes.func,
};
