import React, {Component} from 'react';

import {Image} from 'react-native';

export class User extends Component {
  render() {
    const {id} = this.props;

    return (
      <Image
        style={{width: 32, height: 32}}
        source={{uri: `https://robohash.org/${id}?set=set2&bgset=bg2&size=32x32`}}
      />
    );
  }
}

User.propTypes = {
  id: React.PropTypes.string,
};