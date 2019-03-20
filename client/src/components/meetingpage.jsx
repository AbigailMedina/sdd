import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
import Sidebar from './sidebar';
import TimerComponent from './timer.jsx';
//import axios from 'axios';
import 'bulma/css/bulma.css'
class MeetingPage extends Component {
	constructor(props) {
	    super(props);
	}

	doShutUp() {
		console.log("Shut Up!");
	}

  	render() {
	    return (
	    	<div class="meetingpage">
	    		<Sidebar/>
	    		<div class="shutup">
					<button type="button" onClick = {this.doShutUp} className="button-is-text">Shut Up!</button>	
				</div>
				<TimerComponent/>	
	    	</div>
	    )
  }
}

export default MeetingPage;
