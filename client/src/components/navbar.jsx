import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Favicon from'react-favicon'
// <Favicon url='/favicon.png'/>
import './css/navbar.css'

class Navbar extends Component {

  	render() {
  		
	    return (
			<div class = 'navbar' id = "nb">
				
				<div>					
					<div class = 'pages'>
						<Link class="name"to={'/'}>Home</Link>
						<Link class="settings" to={'/usersettings'}>Settings</Link>
				    </div>

				</div>
			</div>
		)
	}
}
export default Navbar;