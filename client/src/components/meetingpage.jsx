import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './timer.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
import ButtonComponent from './buttonComponent.jsx';

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

  	render() {
	    return (
	    	<div class="columns">
	    		<Sidebar class="column is-one-quarter"/>
	    		<div class="columns column is-three-quarters level" style = {{marginTop:"100px"}}>
	    			
	    			<ButtonComponent class="column is-one-quarter level"/>
	    			
						<TimerComponent class="column is-one-quarter level"/>	
				
	    		</div>
	    	</div>
	    )
  }
}

export default MeetingPage;
