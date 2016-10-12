import React, {Component, PropTypes} from 'react';

import {View, Platform, Image} from 'react-native';

import styles from '../styles';

export class User extends Component {
  render() {
    const {id, size} = this.props;

    // border radius has to be applied on the image for android
    const baseImageStyle = {width: size, height: size};
    const imageStyle = Platform.OS === 'ios' ? baseImageStyle : [styles.rounded6, baseImageStyle];

    return (
      <View style={[styles.rounded6, {width: size, height: size, overflow: 'hidden' }]}>
        <Image
          style={imageStyle}
          source={{uri: `https://robohash.org/${id}?set=set2&bgset=bg2&size=${size}x${size}`}} />
      </View>
    );
  }
}

User.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
};
