import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import './style.css'


class LoginPage extends Component {

  render() {
    return (
    	<div class="content">
	    	<div>
	         	<p>hi, this is login page</p>
	         	<p> Sign up here if you haven't:</p>
	         	<div>
           			<Link class="signup" to={'/signup'}>Sign Up</Link>
            	</div>
		    </div>
    	</div>
    )
  }
}

export default LoginPage;
