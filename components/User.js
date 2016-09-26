import React, {Component, PropTypes} from 'react';

import {View, Image} from 'react-native';

import s from '../styles';

export default class User extends Component {
  render() {
    const {uri, size} = this.props;

    return (
      <View style={[s.rounded6, { width: size, height: size, overflow: 'hidden' }]}>
        <Image
          style={{width: size, height: size}}
          source={{uri}} />
      </View>
    );
  }
}

User.propTypes = {
  uri: PropTypes.string,
  width: PropTypes.number,
};
