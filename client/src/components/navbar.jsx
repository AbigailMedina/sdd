import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'
import LoginPage from './loginpage'

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

  	render() {

	    return (

			<div class = 'navbar' id = "nb">		
				<div class = 'pages level'>
					
					{ this.props.loggedIn||this.state.loggedIn ? 
						<div class = 'level'>
							<Link className="level-left name"to={'/'}>Home</Link>
							<Link className="level-right" to={`/settings/${this.props.userId}`}>Settings</Link>
							<Link className="level-right" to={'/logout'} onClick={this.handleLogoutClick} >Logout</Link>
							
						</div>
						:
						<div></div>
					}
				</div>
			</div>
		)
	}
}

export default Navbar;