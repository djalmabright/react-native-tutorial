import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Dimensions,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import User from './User';
import {messageCount} from '../constants';

import s from '../styles';

const messagesInAScrollView = Platform.OS === 'ios' ? 6.4 : 5.8;

const renderMessage = (data) => {
  const msgDate = new Date(data.When);
  const msgDateTime = msgDate.toLocaleDateString() + ' at ' + msgDate.toLocaleTimeString();

  return (
    <View style={[ s.flx1, s.flxRow, s.p1, s.borderBHl, { borderColor: '#aaa' }]} key={data.When}>
      <View style={[s.mt1]}>
        <User id={data.Who} size={32} />
      </View>
      <View style={[ s.flxCol, s.ml2 ]}>
        <View>
          <Text>{ data.Who }</Text>
        </View>
        <View style={[ s.flxRow ]}>
          <Icon name="alarm" size={14} />
          <Text style={[ s.f6, { marginLeft: 3 } ]}>{ msgDateTime }</Text>
        </View>
        <View style={[ s.mt1 ]}>
          <Text>{ data.What }</Text>
        </View>
      </View>
    </View>
  );
};

export default class ChatHistory extends Component {
  constructor() {
    super();

    this.historySource = new ListView.DataSource({
      rowHasChanged: (prev, next) => prev !== next
    });

    this.state = {
      viewHeight: 0,
      loaded: false,
      ds: this.historySource.cloneWithRows([]),
    };
  }

  onScroll = (e) => {
    if (e.nativeEvent.contentOffset.y === 0) {
      this.props.fetchHistory();
    }
  }

  scrollToBottom = () => {
    // scroll only when we should
    // scrollView takes up about 7 messages,
    // and we need a height that makes sense
    if (this.props.history.length >= 7) {
      const viewHeight = this.state.viewHeight;
      const height = (this.props.history.length / messagesInAScrollView) * viewHeight - viewHeight;
      this.refs.scrollView.scrollTo({
        x: 0,
        y: height,
        animated: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    const rows = nextProps.history.filter(h => h.Who != null);
    const source = this.historySource.cloneWithRows(rows);

    this.setState({
      ds: this.historySource.cloneWithRows(rows),
    });
  }

  componentDidUpdate(prevProps) {

    const {props} = this;

    // fresh load
    if (prevProps.history.length === 0 &&
        props.history.length > prevProps.history.length &&
        !this.state.loaded) {
      this.setState({ loaded: true }, () => this.scrollToBottom());
    }

    // if adding additional history maintain scroll position
    if (prevProps.history.length > 0 &&
        props.history.length - prevProps.history.length > 1) {
      const viewHeight = this.state.viewHeight;
      const oldHeight = (prevProps.history.length / messagesInAScrollView) * viewHeight - viewHeight;
      const newHeight = (props.history.length / messagesInAScrollView) * viewHeight - viewHeight;

      this.refs.scrollView.scrollTo({
        x: 0,
        y: newHeight - oldHeight,
        animated: false,
      });
    }

    // reset 'loaded' flag on cleared history
    if (props.history.length === 0 &&
        prevProps.history.length > props.history.length) {
      this.setState({ loaded: false });
    }
  }

  render() {
    const { props, state, onScroll } = this;

    return (
      <View onLayout={(e) =>
          this.setState({ viewHeight: e.nativeEvent.layout.height })
        }
        style={[s.flx1, s.flxRow, s.selfStretch]}>
        <ScrollView ref="scrollView"
          scrollEventThrottle={100}
          onScroll={onScroll}>
          { props.history.length === 0 ?
              (<Text style={[s.italic, s.p2, s.center]}>No messages</Text>) :
              (<ListView enableEmptySections
                 dataSource={this.state.ds}
                 renderRow={renderMessage}/>) }
        </ScrollView>
      </View>
    );
  }
}

ChatHistory.propTypes = {
  history: React.PropTypes.array,
  fetchHistory: React.PropTypes.func,
};
