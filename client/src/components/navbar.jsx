import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

// class containing links to components displayed in the navigation bar
class Navbar extends Component {
	constructor(props) {
<<<<<<< HEAD
	    super(props);
	    this.handleLogoutClick = this.handleLogoutClick.bind(this);
	    this.state = {loggedIn: this.props.loggedIn};
    
=======
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {LoggedIn: false};
  	}

  	handleLoginClick() {
    	this.setState({LoggedIn: true});
>>>>>>> parent of 8617262... finished user specific functionality, broken navbar style
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
<<<<<<< HEAD
				{ this.state.loggedIn ?
					<div>
						<Link class="name"to={'/'}>Home</Link>
					</div>:
					<div></div>
				}
				{ this.state.loggedIn ?
					<div class="loggedin">
						<Link to={`/settings/${this.props.userId}`}>Settings</Link>
						<Link to={'/login'} onClick={this.handleLogoutClick} >Logout</Link>
					</div>:
					<div></div>
				}
					
				
					
=======
					<div>
						<Link class="name"to={'/'}>Home</Link>
					</div>
					{ LoggedIn ? 
						<div class="loggedin">
							<Link to={`/settings/${this.props.userId}`}>Settings</Link>
							<Link to={'/login'} onClick={this.handleLogoutClick} >Logout</Link>
						</div>
						:
						<Link class="login" to={'/login'} onClick={this.handleLoginClick} >Login</Link>
					}
>>>>>>> parent of 8617262... finished user specific functionality, broken navbar style
				</div>
			</div>

		
		)
	}
}

export default Navbar;