import React from 'react';
import { v4 as getId } from 'uuid';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import MapPage from './components/MapPage';
import ReportPage from './components/ReportPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import storage from './storage';


import AppStyles from './styles/App.sass';

const user = storage.get('dymek-user');
if (!user) {
  storage.set('dymek-user', getId());
}

export default () => (
  <Router>
    <div className={AppStyles.App}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MapPage} />
        <Route exact path="/report" component={ReportPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
