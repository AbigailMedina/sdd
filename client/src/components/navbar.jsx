import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

// class containing links to components displayed in the navigation bar
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

  	// function to set state when user is logged out
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
				</div>:
				<div></div>
				{ this.state.loggedIn ?
					<div class="loggedin">
						<Link to={`/settings/${this.props.userId}`}>Settings</Link>
						<Link to={'/login'} onClick={this.handleLogoutClick} >Logout</Link>
					</div>:
					<div></div>
				}
					
				
					
				</div>
			</div>

		
		)
	}
}

export default Navbar;