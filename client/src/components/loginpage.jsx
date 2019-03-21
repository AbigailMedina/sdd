import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

class LoginPage extends Component {
  constructor(props){
      super(props);

      this.onChangeUserId = this.onChangeUserId.bind(this);
      this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
      this.state = {
        userId: '',
        password: ''
      }
    }

    onChangeUserId(e){
      this.setState({
        userId:e.target.value
      })
    }

    onChangeUserPassword(e){
      this.setState({
        password:e.target.value
      })
    }

    onSubmit(e){
      const uri = "https://sdd-shutup.herokuapp.com"

      e.preventDefault();

      console.log("Form Submitted");
      console.log("User Info", this.state.userId);
      console.log("User Info", this.state.password);
      
      const user = {
        userId: this.state.userId,
        password: this.state.password
      }

      axios.post(uri+'/users/login', user).then(function (response) {
       console.log(response);
       if(response.data.code == 200){
         console.log("Login successfull", response.data.user);
       }
       else if(response.data.code == 400){
         console.log(response.data);
       }
       else{
         console.log("Username does not exist");
       }
     }).catch(function (error) {
         console.log(error);
       });
      this.setState({
        userId: '',
        password: ''
      })

    }
    signUp(){
      window.location.href = "#/signUp";
    }

    render() {
      return (
        <div className="columns is-centered" style={{marginTop: 80 }}>
          <form className="column is-half "onSubmit = {this.onSubmit.bind(this)}>
              <h2 class="title is-2">Log In</h2>
              <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                      <input  type="text" 
                              className="input"
                              placeholder = "jdoe2"
                              value = {this.state.userId}
                              onChange = {this.onChangeUserId}
                              />
                  </div>
              </div>
              <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                      <input  type="password" 
                              className="input"
                              placeholder = "Password"
                              value = {this.state.password}
                              onChange = {this.onChangeUserPassword}
                              />
                  </div>
              </div>
              <div className ="field is-grouped">
                <button className="button is-primary" type="submit" >Submit</button>
                <button className="button is-text" onClick={this.signUp.bind(this)} value="Signup">Sign up</button>
              </div>
          </form>
      </div>
    )
  }
}

export default LoginPage;
