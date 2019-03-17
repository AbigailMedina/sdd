import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/homepage';
import LoginPage from './components/loginpage';
import AboutUs from './components/aboutus';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CreateProject from './components/createProject';
import TimerComponent from './components/timer';
import StartButton from './components/timer';

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
            exact path="/timer"     //need to move this later
            component={TimerComponent} 
            />
          <Route 
            exact path="/login" 
            component={LoginPage} 
            />
          <Route 
            exact path="/AboutUs" 
            component={AboutUs} 
            />
            <Route 
            exact path="/add" 
            component={CreateProject} 
            />
            <Footer/>

          </div>
      </HashRouter>

      </div>
    );
  }
}

export default App;
