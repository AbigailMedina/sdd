import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/homepage';
import LoginPage from './components/loginpage';
import SignUpPage from './components/signupPage';
import AboutUs from './components/aboutus';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CreateProject from './components/createProject';
import TimerComponent from './components/timer';
import "react-component-countdown-timer/lib/styles.css";
import MeetingPage from './components/meetingpage';
import UserSettings from './components/usersettings';
import GroupSettings from './components/groupsettings';
import Chat from './components/chat';

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
            exact path="/signUp" 
            component={SignUpPage} 
          />
          <Route 
            exact path="/AboutUs" 
            component={AboutUs} 
          />
          <Route 
            exact path="/add" 
            component={CreateProject} 
          />
          <Route
            exact path="/meeting"
            component={MeetingPage}
          />
          <Route
            exact path="/settings"
            component={UserSettings}
          />
          <Route
            exact path="/groupsettings"
            component={GroupSettings}
          />
          <Route
            exact path="/chat"
            component={Chat}
          />
         <Footer/>
        </div>
      </HashRouter>

      </div>
    );
  }
}

export default App;
