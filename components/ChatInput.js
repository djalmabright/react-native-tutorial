import React, {Component, PropTypes} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import s from '../styles';

import {MKButton} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Fab = MKButton.plainFab()
  .withBackgroundColor('#26a69a')
  .withStyle([ s.w3, s.h3, s.rounded, s.border0 ])
  .build();

class ChatInput extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  }

  onChange = () => {}

  render() {
    const { props, onSubmit, onChange } = this;

    /*
     * temporary
     */
    const id = Math.random().toString(10).slice(6);
    const imgURL = 'http://robohash.org/' + id + '?set=set2&bgset=bg2&size=70x70';

    const containerStyle = [ s.flx1, s.flxCol, s.bgBase, s.pv1, s.ph2, { maxHeight: 135 } ];

    const inputStyle = [ s.white, { width: 220 }, s.h3, s.f5, s.p0, s.m0 ];

    return (
      <View style={containerStyle}>
        <View style={[s.flxRow, s.jcStart]}>
          <View style={[s.mt1]}>
            <Icon name="message" size={30} color="white" />
          </View>
          <View style={[s.h3, s.mh2, s.borderBHl, { borderBottomColor: 'white' }]}>
            <TextInput ref="txtMessage"
              placeholder="Type your message"
              placeholderTextColor="#ccc"
              style={inputStyle}/>
          </View>
          <Fab>
            <Icon name="send" size={25} color="white" />
          </Fab>
        </View>
        <View style={[s.mt2, s.flxRow, s.rounded6, s.bgSilver, s.h2, { width: 160 }]}>
          <View style={[s.rounded6, s.w2, s.h2, { overflow: 'hidden' }]}>
            <Image style={[s.w2, s.h2]} source={{uri: imgURL}} />
          </View>
          <View style={[s.ml1]}>
            <Text style={[s.black, s.italics, s.f6, { marginTop: 10, fontStyle: 'italic' }]}>{id}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ChatInput.propTypes = {
  userID: PropTypes.number,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};

export default ChatInput;


