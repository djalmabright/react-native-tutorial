import {Iterable} from 'immutable';

import createLogger from 'redux-logger';

const toJS = object => {
  const mapped = new Object();

  for (const key of Object.keys(object)) {
    if (Iterable.isIterable(object[key])) {
      mapped[key] = object[key].toJS();
    }
    else {
      mapped[key] = object[key];
    }
  }

  return mapped;
};

export const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: state => toJS(state),
});
