import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import User from './User';
import {messageCount} from '../constants';

import styles from '../styles';

const renderMessage = (data) => {
  const msgDate = new Date(data.When);
  const msgDateTime = msgDate.toLocaleDateString() + ' at ' + msgDate.toLocaleTimeString();

  return (
    <View style={[ styles.flx1, styles.flxRow, styles.p1, styles.borderBHl, { borderColor: '#aaa' }]} key={data.When}>
      <View style={[styles.mt1]}>
        <User uri={data.Who.avatar_url} size={32} />
      </View>
      <View style={[ styles.flxCol, styles.ml2 ]}>
        <View>
          <Text>{ data.Who.login }</Text>
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

export default class ChatHistory extends Component {
  constructor() {
    super();

    this.historySource = new ListView.DataSource({rowHasChanged: (lhs, rhs) => lhs !== rhs});

    this.state = {
      scrollViewHeight: 0,
    };
  }

  onScroll = (e) => {
    if (e.nativeEvent.contentOffset.y === 0) {
      this.props.fetchHistory();
    }
  }

  onContentSizeChange = (width, height) => {
    if (height > 0) {
      this.setState({ scrollViewHeight: height - 380 });
    }
  }

  scrollToBottom = () => {
    // scroll only when we should
    // scrollView takes up about 7 messages,
    // and we need a height that makes sense
    if (this.props.history.length >= 7) {
      const scrollViewHeight = this.state.scrollViewHeight;
      this.refs.scrollView.scrollTo({
        x: 0,
        y: scrollViewHeight,
        animated: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history.length === 0 &&
      this.props.history.length > prevProps.history.length) {
      this.scrollToBottom();
    }
  }

  render() {
    const { props, state, onScroll, onContentSizeChange } = this;

    const rows = props.history.filter(h => h.Who.login != null);

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
