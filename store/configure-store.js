import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import {rootReducer} from '../reducers';

export const configureStore = initialState => {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept(() => {
      const {reducer} = require('../reducers');
      store.replaceReducer(reducer);
    });
  }

  return store;
};
