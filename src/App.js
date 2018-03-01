/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Amplify from 'aws-amplify';
import logger from 'redux-logger';

import './App.sass';
import reducers from './reducers/index';
import AWS_EXPORTS from './aws-exports';
import { USER } from './consts';
import saga from './sagas/index';
import MapPage from './components/MapPage';
import storage from './storage';

Amplify.configure(AWS_EXPORTS);


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(saga);

const user = storage.get('dymek-user');
if (!user) {
  store.dispatch({ type: USER.CREATE });
} else {
  store.dispatch({ type: USER.SET, payload: user });
}

// store.dispatch({ type: MARKERS.FETCH_LIST });

export default () => (
  <MapPage />
);
