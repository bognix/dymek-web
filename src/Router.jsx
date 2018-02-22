import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapContainer from './containers/Map';
import Feed from './components/Feed';
import Main from './components/Main';
import NotFound from './components/NotFound';

export default ({ children }) => (
  <BrowserRouter>
    <div>
      {children}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/map" component={MapContainer} />
        <Route path="/feed" component={Feed} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);