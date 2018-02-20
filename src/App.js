import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Router from './Router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <h1 className="App-title">Aplikacja Dymek</h1>
        </header>
        <Router/>
      </div>
    );
  }
}

export default App;
