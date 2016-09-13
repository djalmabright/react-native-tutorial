import createLogger from 'redux-logger';

export const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: state => state.toJS(),
});
