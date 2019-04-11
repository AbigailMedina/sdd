import React, { Component } from 'react'
import axios from 'axios';

import './style.css'

import Sidebar from './sidebar';
import User from '../models/User';

import 'bulma/css/bulma.css'
class UserSettings extends Component {

	constructor(props) {
		const user = null;
	    super(props);
	    this.state = {
	    	name:null,
	    	email:null,
	    	projects:[]
	    }
	}

	componentDidMount(props) {
		const { match: { params } } = this.props;
		axios.get(`http://localhost:5000/users/${params.id}`).then(response => {
			this.user = new User(response.data.user);
			this.setState({
				name:response.data.user.name,
				email:response.data.user.email,
				projects:response.data.user.projects
			})
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	showProjects() { 
		var content = [];
		if(!this.user) { 
			return content;
		}

		content = this.state.projects.map((project) => {
		return(
			<li className = "level" key={project}>{project.name}
				<div className="control">
				    <button className="button is-danger" onClick={() =>{
				    	this.onRemoveProject(project)
				    }}>Leave project</button>
				</div>
			</li> 
			)		
		})
		return content;
	}

	onRemoveProject(removeMe) {
		this.user.onRemoveProject(removeMe).then((newArray) => {
			this.setState({projects: newArray});
		})
	}

	updateUser(newArray) {
		const { match: { params } } = this.props;
		console.log("in usersettings updateUser. updating with newArray:", newArray)
		this.user.update(params.id,newArray).then((response) => {
			this.setState({
				name:response.data.user.name,
				email:response.data.user.email,
				projects:response.data.user.projects
			})
		}) 
	}

	render() {
		const projects = this.showProjects.bind(this);
	  	return (
	    	<div class="groupsettings columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">User Settings for {this.state.name}</h2>
					<label className="label">Projects you're a member of</label>
					
					<span>{projects()}</span>					
				</div>				
	    	</div>
	    )
  }	
}

export default UserSettings;