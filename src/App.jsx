import { withRouter } from 'react-router-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Amplify from 'aws-amplify';
import logger from 'redux-logger';

import Navbar from './components/Navbar';
import Router from './Router';
import './App.css';
import reducers from './reducers/index';
import AWS_EXPORTS from './aws-exports';
import { MARKERS } from './consts';
import saga from './sagas/index';

Amplify.configure(AWS_EXPORTS);


const sagaMiddleware = createSagaMiddleware();
const NavbarWithRouter = withRouter(Navbar);
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(saga);

store.dispatch({ type: MARKERS.FETCH_LIST });

export default () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <NavbarWithRouter />
      </div>
    </Router>
  </Provider>
);
