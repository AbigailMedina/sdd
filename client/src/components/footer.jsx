import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Favicon from'react-favicon'
// <Favicon url='/favicon.png'/>
import './css/footer.css'

class Footer extends Component {
	



  	render() {
  		


	    return (
			<div class = 'footer'>	
			
				<div class="aboutus">
					<Link  to={'/AboutUs'}>About Us</Link>
				</div>
			
			
			</div>
		)
	}
}
export default Footer;