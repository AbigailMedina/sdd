import React, { Component } from 'react'
import axios from 'axios';

import './style.css'
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';


class GroupSettings extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
	    super(props);
	    this.state = {
	    	projectName:"",
	    	collaborators:[]
	    }
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({
                	projectName:response.data.project.name,
                	collaborators:response.data.project.collaborators})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
	render() {
	  	return (
	    	<div class="groupsettings columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">Group Settings for {this.state.projectName}</h2>
					<label className="label">Collaborator Emails</label>
					{this.state.collaborators.map((collaborator) => {
						return( 
							<li className = "level" key={collaborator}>{collaborator}
								<div className="control">
								    <button className="button is-danger" onClick={() =>
								    	console.log("remove", collaborator)
								    	//will send patch here to /projects/:id/removeUser/:userID
								    	//first need to make sure collaborators are of User type, not just strings
								    }>Remove collaborator</button>
								</div>
							</li> 
							)
						})
					}
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;