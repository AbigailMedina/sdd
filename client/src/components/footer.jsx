import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Favicon from'react-favicon'
// <Favicon url='/favicon.png'/>
import './css/footer.css'

class Footer extends Component {
	



  	render() {
  		


	    return (
			<div class = 'footer'>	
			
				<div class="git">
					<a href='https://github.com/AbigailMedina/sdd'>Git</a>
				</div>

				<div class="about">
					<Link  to={'/AboutUs'}>About Us </Link>
				</div>
			
				<div class="shutup">
					<p>ShutUp!</p>
				</div>

			</div>
		)
	}
}
export default Footer;