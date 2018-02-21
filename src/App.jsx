import { withRouter } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Router from './Router';
import './App.css';

const NavbarWithRouter = withRouter(Navbar);

export default () => (
  <Router>
    <div className="App">
      <NavbarWithRouter />
    </div>
  </Router>
);
