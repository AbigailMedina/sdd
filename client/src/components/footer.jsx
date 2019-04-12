import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/footer.css'

// class rendering contents of footer which is placed on each page
class Footer extends Component {
  	render() {
	    return (
			<div className = 'footer level'>
				<div className="git level-item">
					<a href='https://github.com/AbigailMedina/sdd'>Github</a>
				</div>
				<div className="shutup level-item">
					<p>ShutUp!</p>
				</div>
				<div className="about level-item">
					<Link  to={'/AboutUs'}>About Us </Link>
				</div>
			</div>
		)
	}
}

export default Footer;