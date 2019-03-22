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
        password: '',
        loginError: false
      }
    }

    onChangeUserId(e){
      this.setState({
        userId:e.target.value,
        loginError:false
      })
    }

    onChangeUserPassword(e){
      this.setState({
        password:e.target.value,
        loginError:false
      })
    }

    onSubmit(e){

      e.preventDefault();

      console.log("Form Submitted");
      console.log("User Info", this.state.userId);
      console.log("User Info", this.state.password);
      
      const user = {
        userId: this.state.userId,
        password: this.state.password
      }
      const uri = "https://sdd-shutup.herokuapp.com"
      const uri2 = "http://localhost:5000"

      axios.post(uri2+'/login', {
        userId: this.state.userId,
        password: this.state.password
      }).then( response=> {
       console.log(response, "response.status:",response.status);
       if(response.status == 200){
         console.log("Login successfull", response.data.user);
       }else{
          this.setState({loginError:true})
          console.log(response.data);
       }
     }).catch(error => {
         
         this.setState({loginError:true},()=>console.log(error))
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
              {this.state.loginError? <div class="help is-danger">Incorrect Username or Password</div>:<div></div>}
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
