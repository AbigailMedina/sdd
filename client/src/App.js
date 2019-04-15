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
import MeetingPage from './components/meetingpage';
import UserSettings from './components/usersettings';
import GroupSettings from './components/groupsettings';
import Chat from './components/chat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      loggedIn: false
    }
  }

  onLogin(user) {
    console.log(user._id);
    this.setState({
      userId: user._id,
      loggedIn: true
    })
  }

  onLogout() {
    this.setState({
      userId: null,
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="App">
      <HashRouter>
        <div>
          <Navbar
            userId={this.state.userId}
          />
          <Route 
            exact path="/" 
            component={HomePage} 
          />
          <Route 
            exact path="/login" 
            render={() => <LoginPage 
              login={this.onLogin.bind(this)}
              logout={this.onLogout.bind(this)}
            />}
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
            exact path="/meeting/:id"
            component={MeetingPage}
          />
          <Route
            exact path="/chat/:id"
            render = {(props) => <Chat
              user = {this.state.userId}
              {...props}
            />}
          />
          <Route
            path="/groupsettings/:id"
            component={GroupSettings}
          />
          <Route
            exact path="/settings/:id"
            component={UserSettings}
          />          
         <Footer/>
        </div>
      </HashRouter>

      </div>
    );
  }
}

export default App;
