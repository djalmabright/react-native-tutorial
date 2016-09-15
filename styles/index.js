import draper from 'Draper';
import {StyleSheet} from 'react-native';

export default {
  iconSize: 40,
  ...draper(),
  ...StyleSheet.create({
    // more flex
    selfStretch: { alignSelf: 'stretch' },

    // colors
    base: { color: '#009688' },
    bgBase: { backgroundColor: '#009688' },
    royalBlue: { color: 'royalblue' },

    // other
    stackTrace: {
      color: 'red',
      fontFamily: 'Courier',
      fontSize: 10,
    },
  }),
}
