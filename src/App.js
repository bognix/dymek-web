import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Router from './Router';
import './App.css';
import {withRouter} from 'react-router-dom'

const NavbarWithRouter = withRouter(Navbar)
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavbarWithRouter/>
          <header className="App-header">
            <h1 className="App-title">Aplikacja Dymek</h1>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
