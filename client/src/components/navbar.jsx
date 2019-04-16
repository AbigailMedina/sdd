import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

// class containing links to components displayed in the navigation bar
class Navbar extends Component {
	constructor(props) {
	    super(props);
	    this.handleLogoutClick = this.handleLogoutClick.bind(this);
	    this.state = {loggedIn: this.props.loggedIn};
  	}

  	// function to set state when user is logged out
  	handleLogoutClick() {
    	this.props.logout()
  	}

  	// function to render links within navbar
  	render() {
	    return (
			<div class = 'navbar' id = "nb">		
				<div class = 'pages level'>
					<div>
						<Link class="name"to={'/'}>Home</Link>
					</div>
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