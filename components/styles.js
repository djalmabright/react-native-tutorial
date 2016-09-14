import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  application: {
    alignSelf: 'stretch',
    flex: 1,
  },
  button: {
    color: 'royalblue',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  typing: {
    backgroundColor: '#eee',
  },
  conversation: {
    alignSelf: 'stretch',
  },
  history: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  flex: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
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
  padding: {
    padding: 8,
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
    justifyContent: 'flex-start'
  },
});

export const iconSize = 40;