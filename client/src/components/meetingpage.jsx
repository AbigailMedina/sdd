import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './TimerComponent.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
import ButtonComponent from './buttonComponent.jsx';

// class rendering components regarding a group's meeting page
class MeetingPage extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
  		super(props);
	}

	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
            console.log("project found in settings: ",response.data.project)
            this.setState({project:response.data.project.name})
        })
        .catch(function (error) {
            console.log(error);
        })
    }

  	render() {
	    return (
	    	<div class="columns" >
	    		<div class="column is-one-quarter level">
	    			<Sidebar />
	    		</div>
	    		<div class="column is-one-quarter level" style = {{marginTop:"100px"}}>
	    			<ButtonComponent />
	    		</div>
	    		<div class="column is-one-quarter level" style = {{marginTop:"100px"}}>
					<TimerComponent	/>
				</div>
	    	</div>
	    )
  	}
}

export default MeetingPage;
