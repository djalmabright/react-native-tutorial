import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    color: 'royalblue',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    marginTop: 25,
  },
  stackTrace: {
    color: 'red',
    fontFamily: 'Courier',
    fontSize: 10,
  },
  vmargin: {
    marginTop: 25,
    marginBottom: 25,
  },
  marginTop: {
    marginTop: 15,
  },
  marginLeft: {
    marginLeft: 5,
  },
  users: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export const iconSize = 40;