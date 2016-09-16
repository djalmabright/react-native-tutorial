import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {User} from './User';
import {messageCount} from '../constants';

import styles from '../styles';

const renderMessage = (data) => {
  const msgDate = new Date(data.When);
  const msgDateTime = msgDate.toLocaleDateString() + ' at ' + msgDate.toLocaleTimeString();

  return (
    <View style={[ styles.flx1, styles.flxRow, styles.p1, styles.borderBHl, { borderColor: '#aaa' }]} key={data.When}>
      <View style={[styles.rounded6, styles.w2, styles.h2, styles.mt1,{ overflow: 'hidden' }]}>
        <User id={data.Who.toString()}/>
      </View>
      <View style={[ styles.flxCol, styles.ml2 ]}>
        <View>
          <Text>Anonymous robot #{ data.Who }</Text>
        </View>
        <View style={[ styles.flxRow ]}>
          <Icon name="alarm" size={14} />
          <Text style={[ styles.f6, { marginLeft: 3 } ]}>{ msgDateTime }</Text>
        </View>
        <View style={[ styles.mt1 ]}>
          <Text>{ data.What }</Text>
        </View>
      </View>
    </View>
  );
};

export class ChatHistory extends Component {
  constructor() {
    super();

    this.historySource = new ListView.DataSource({rowHasChanged: (lhs, rhs) => lhs !== rhs});
    this.scrollViewHeight = 0;
  }

  onScroll = (e) => {
    if (e.nativeEvent.contentOffset.y === 0) {
      this.props.fetchHistory();
    }
  }

  onContentSizeChange = (width, height) => {
    // scroll to bottom on first load
    if (this.scrollViewHeight === 0) {
      this.scrollViewHeight = height;
      // do initial scroll only when we have to
      // scrollView takes up about 6 messages
      if (this.props.history.length >= 6) {
        this.refs.scrollView.scrollTo({ x: 0, y: height, animated: false });
      }
    }
  }

  render() {
    const { props, state, onScroll, onContentSizeChange } = this;

    const rows = props.history.filter(h => h.Who != null);

    const source = this.historySource.cloneWithRows(rows);

    return (
      <View style={[styles.flx1, styles.flxRow, styles.selfStretch]}>
        <ScrollView ref="scrollView"
          scrollEventThrottle={100}
          onScroll={onScroll}
          onContentSizeChange={onContentSizeChange}>
          <ListView enableEmptySections
            dataSource={source}
            renderRow={renderMessage}/>
        </ScrollView>
      </View>
    );
  }
}

ChatHistory.propTypes = {
  history: React.PropTypes.array,
  fetchHistory: React.PropTypes.func,
};
