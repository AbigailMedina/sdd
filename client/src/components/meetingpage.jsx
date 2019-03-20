import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
import HomePage from './homepage.jsx';
//import axios from 'axios';
import 'bulma/css/bulma.css'
class MeetingPage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"
	    }
	}

	doShutUp() {
		console.log("Shut Up!");
	}

  	render() {
	    return (
	    	<div class="meetingpage">
	    		<HomePage/>
	    		<div class="shutup">
					<button type="button" onClick = {this.doShutUp} className="button-is-text">Shut Up!</button>	
				</div>	
	    	</div>
	    )
  }
}

export default MeetingPage;
