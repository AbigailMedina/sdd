import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './timer.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
class MeetingPage extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
	    super(props);
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({project:response.data.project.name})
            })
            .catch(function (error) {
                console.log(error);
            })
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
