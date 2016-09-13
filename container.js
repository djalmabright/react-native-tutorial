import React from 'react';

import {Text} from 'react-native';

import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class BareContainer extends React.Component {
  render() {
    return (
      <Text>Container!</Text>
    );
  }
}

export const Container = connect(mapStateToProps, mapDispatchToProps)(BareContainer);
