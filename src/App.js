/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { v4 as getId } from 'uuid';

import MapPage from './components/MapPage';
import storage from './storage';
import Navbar from './components/Navbar';

import './App.sass';

const user = storage.get('dymek-user');
if (!user) {
  storage.set('dymek-user', getId());
}

export default () => (
  <div className="App">
    <Navbar />
    <MapPage />
  </div>
);
