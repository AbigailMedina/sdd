import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './TimerComponent.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
import ButtonComponent from './buttonComponent.jsx';
import NotesComponent from './NotesComponent.jsx';

// class rendering components regarding a group's meeting page
class MeetingPage extends Component {
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"
  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
            console.log("project found in meeting: ",response.data.project)
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
	    			<Sidebar user={this.props.user}/>
	    		</div>
	    		<div class="column is-one-quarter level" style = {{marginTop:"100px"}}>
					<TimerComponent	/><br/>
					<ButtonComponent />
	    		</div>
	    		<div class="column is-one-third level" style = {{marginTop:"100px"}}>
					<NotesComponent	{...this.props}/>
	    		
				</div>
				
	    	</div>
	    )
  	}
}

export default MeetingPage;
