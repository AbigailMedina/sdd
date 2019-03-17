import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import './style.css'


class LoginPage extends Component {
	constructor(props){
		super(props);

		this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
		this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
		this.state = {
			email: '',
			password: ''
		}
	}

	onChangeUserEmail(e){
		this.setState({
			email:e.target.value
		})
	}

	onChangeUserPassword(e){
		this.setState({
			password:e.target.value
		})
	}

	onSubmit(e){
		e.preventDefault();

		console.log("Form Submitted");
		console.log(`User Info ${this.state.email}`);
		console.log(`User Info ${this.state.password}`);
		
		const loggedUser = {
			email: this.state.email,
			password: this.state.password
		}

		this.setState({
			email: '',
			password: ''
		})

	}
  render() {
    return (
    	<div class="content">
	    	<div>
	         	<p>hi, this is login page</p>
		    </div>
    	</div>
    )
  }
}

export default LoginPage;
