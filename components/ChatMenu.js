import React, {Component, PropTypes} from 'react';

import {
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {User} from './User';

import styles from '../styles';

const renderChannel = (selectChannel) => (channel) => {
  return (
    <TouchableOpacity style={[styles.p2]}
      activeOpacity={0.6}
      onPress={() => selectChannel(channel)}>
      <View style={[styles.flxRow]}>
        <Icon name="message" size={30} color="white" />
        <Text style={[styles.silver, styles.ml2, {marginTop: 6}]}>{channel}</Text>
      </View>
    </TouchableOpacity>
  )
};

const renderFriend = (selectFriend) => (friend) => {
  return (
    <TouchableOpacity style={[styles.p2]}
      activeOpacity={0.6}
      onPress={() => selectFriend(friend.id)}>
      <View style={[styles.flxRow]}>
        <User uri={friend.avatarUrl} size={32} />
        <View style={[styles.ml2, {marginTop: 6}]}>
          <Text style={[styles.silver]}>{friend.login}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export class ChatMenu extends Component {
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
    const {
      channels,
      friends,
      selectChannel,
      selectFriend,
      signOut,
    } = this.props;

    const channelsSource = this.channelsDataSource.cloneWithRows(channels);
    const friendsSource = this.friendsDataSource.cloneWithRows(friends);

    return (
      <View style={[styles.flx1, styles.flxCol, styles.selfStretch, styles.pt3, styles.ph3, styles.ml2, styles.bgNavy]}>
        <TouchableOpacity style={[styles.mb3, styles.pl2]}
          activeOpacity={0.6}
          onPress={signOut}>
          <View style={[styles.flxRow]}>
            <Icon name="power-settings-new" size={25} color="white" />
            <Text style={[styles.silver, styles.ml1, {marginTop: 6}]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <ListView style={[styles.mb3, styles.flx1]}
            dataSource={channelsSource}
            scrollEnabled={false}
            renderHeader={() => (<Text style={[styles.silver, styles.pl2, styles.f3]}>Channels</Text>)}
            renderRow={renderChannel(selectChannel)}/>
          <ListView style={[styles.flx2]}
            enableEmptySections
            scrollEnabled={false}
            dataSource={friendsSource}
            renderHeader={() => (<Text style={[styles.silver, styles.pl2, styles.f3]}>Friends</Text>)}
            renderRow={renderFriend(selectFriend)}/>
        </ScrollView>
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
