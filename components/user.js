import React, {Component} from 'react';

import {Image} from 'react-native';

import styles from '../styles';

export class User extends Component {
  render() {
    const {id} = this.props;

    const {robotSize} = styles;

    const dimensions = `${robotSize}x${robotSize}`;

    return (
      <Image
        style={{width: robotSize, height: robotSize}}
        source={{uri: `https://robohash.org/${id}?set=set2&bgset=bg2&size=${dimensions}`}}
      />
    );
  }
}

User.propTypes = {
  id: React.PropTypes.string,
};
