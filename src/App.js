/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { v4 as getId } from 'uuid';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import MapPage from './components/MapPage';
import Main from './components/Main';
import storage from './storage';
import Navbar from './components/Navbar';


import './App.sass';

const user = storage.get('dymek-user');
if (!user) {
  storage.set('dymek-user', getId());
}

export default () => (
  <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/map" component={MapPage} />
      </Switch>
    </div>
  </Router>
);
