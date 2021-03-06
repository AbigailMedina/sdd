import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
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
import OldNotesPage from './components/OldNotesPage';

// main class used to establish routes to component pages
class App extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      user:this.cookies.get('User'),
      loggedIn: this.cookies.get('User') ? true:false
    }
  }

  // function to log in user and set appropriate cookie path
  onLogin(user) {
    this.setState({
      user: user,
      loggedIn: true
    })
    this.cookies.set('User', user, { path: '/' });
    window.location.reload();
  }

  // function to log out user and remove cookie session for user
  onLogout() {
    this.cookies.remove('User');
    this.setState({
      userId: null,
      loggedIn: false
    })
    window.location.href="/"
  }

  // function assigning and rendering routes between pages
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <Navbar
              userId={this.state.user ? this.state.user._id:""}
              loggedIn ={this.state.loggedIn}
              logout={this.onLogout.bind(this)}
            /> 
            <Route 
              exact path="/AboutUs" 
              component={AboutUs} 
            />
            {!this.state.loggedIn && 
              <Switch>
                <Route 
                    exact path="/" 
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
                  exact path="/login" 
                  render={() => <LoginPage 
                    login={this.onLogin.bind(this)}
                    logout={this.onLogout.bind(this)}
                  />}
                />
              </Switch>
            }
            {this.state.loggedIn &&
              <Switch>
              <Route 
                  exact path="/add" 
                  render={(props) => <CreateProject 
                      user={this.state.user}
                      {...props}
                    />}
                />
                <Route 
                  exact path="/" 
                  render={(props) => <HomePage 
                      user={this.state.user}
                      {...props}
                    />}
                />
                <Route
                  exact path="/meeting/:id"
                  render={(props) => <MeetingPage 
                      user={this.state.user}
                      {...props}
                    />}
                />
                <Route
                  exact path="/chat/:id"
                  render={(props) => <Chat 
                      user={this.state.user}
                      {...props}
                    />}
                />
                <Route
                  path="/groupsettings/:id"
                  render={(props) => <GroupSettings 
                      user={this.state.user}
                      {...props}
                    />}
                />
                <Route
                  exact path="/settings/:id"
                  render={(props) => <UserSettings 
                      user={this.state.user}
                      {...props}
                    />}
                /> 
                <Route
                  exact path="/oldnotes/:id"
                  render={(props) => <OldNotesPage 
                      user={this.state.user}
                      {...props}
                    />}
                />
              </Switch>
            }         
            <Footer/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
