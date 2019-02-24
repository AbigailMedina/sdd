import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/homepage';
import LoginPage from './components/loginpage';
import Navbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
       <HashRouter>

        <div>
          <Navbar/>

          <Route 
            exact path="/" 
            component={HomePage} 
            />
          <Route 
            exact path="/login" 
            component={LoginPage} 
            />
          </div>
      </HashRouter>

      </div>
    );
  }
}

export default App;
