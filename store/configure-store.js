import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import thunk from 'redux-thunk';

import {logger} from './logger';

import {rootReducer} from '../reducers';

export const configureStore = initialState => {
  const middleware = applyMiddleware(logger, thunk);

  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept(() => {
      const {rootReducer} = require('../reducers');
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
