import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Favicon from'react-favicon'
// <Favicon url='/favicon.png'/>
import './css/navbar.css'

class Navbar extends Component {
	constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {LoggedIn: false};
  	}

  	handleLoginClick() {
    	this.setState({LoggedIn: true});
  	}

  	handleLogoutClick() {
    	this.setState({LoggedIn: false});
  	}



  	render() {
  		const LoggedIn=this.state.LoggedIn;
	    return (
			<div class = 'navbar' id = "nb">				
					<div class = 'pages level'>
						<div>
							<Link class="name"to={'/'}>Home</Link>
						</div>
						<div class="aboutus">
							<Link  to={'/AboutUs'}>About Us</Link>
						</div>
						{ LoggedIn ? 
							<div class="loggedin">
								<Link to={'/usersettings'}>Settings</Link>
								<Link to={'/login'} onClick={this.handleLogoutClick} >Logout</Link>
							</div>
						 :
							<Link class="login" to={'/login'} onClick={this.handleLoginClick} >Login</Link>
						}</div>
            <div>
              <Link class="signup" to={'/signup'}>Sign Up</Link>
            </div>
			</div>
		)
	}
}
export default Navbar;