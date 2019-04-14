import React, { Component } from 'react'

import axios from 'axios';

import './style.css'
import Sidebar from './sidebar';
import User from '../models/User';

import 'bulma/css/bulma.css'

// class containing information about user settings for a specific user
class UserSettings extends Component {

	constructor(props) {
		const user = null;
	    super(props);
	    this.state = {
	    	name:null,
	    	email:null,
	    	password:null,
	    	projects:[],
	    	newEmail:"",
	    	newPass:""
	    }
	}

	componentDidMount(props) {
		const { match: { params } } = this.props;
		axios.get(`http://localhost:5000/users/${params.id}`).then(response => {
			this.user = new User(response.data.user);
			this.setState({
				name:response.data.user.name,
				email:response.data.user.email,
				password:response.data.user.password,
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
			<div className="field has-addons">
				<li className = "level" key={project}>{project.name}
					<div className="column is-one-quarter">
					    <button className="button is-danger" onClick={() =>{
					    	this.onRemoveProject(project)
					    }}>Leave project</button>
					</div>
				</li> 
			</div>
			)		
		})
		return content;
	}

	onRemoveProject(removeMe) {
		this.user.onRemoveProject(removeMe).then((newArray) => {
			this.setState({projects: newArray});
		})
	}

	onChangeEmail(e) {
		this.setState({
			newEmail:e.target.value
		})
	}

	onUpdateEmail() {
		this.user.onChangeEmail(this.state.newEmail).then((newEmail) => {
			this.setState({email:newEmail, newEmail:""})
		})	
	}

	onChangePass(e) {
		this.setState({
			newPass:e.target.value
		})
	}

	onUpdatePass() {
		this.user.onChangePassword(this.state.newPass).then((newPass) => {
			this.setState({password:newPass,newPass:""})
		})
	}

	updateUser(newArray) {
		const { match: { params } } = this.props;
		console.log("in usersettings updateUser. updating with newArray:", newArray)
		this.user.update(params.id,newArray).then((response) => {
			this.setState({
				name:response.data.user.name,
				email:response.data.user.email,
				password:response.data.user.password,
				projects:response.data.user.projects
			})
		}) 
	}

	render() {
		const projects = this.showProjects.bind(this);
	  	return (
	    	<div class="groupsettings columns">
	    		<div class="column is-one-quarter level">
	    			<Sidebar user={this.props.user}/>
	    		</div>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">User Settings for {this.state.name}</h2>
					<label className="label">Projects you're a member of</label>	
					<span>{projects()}</span>	
					<br></br>
					<div className="field is-grouped">
						<div className="control">
							<input  type="email"
									size="40"
									className="input"
									placeholder={this.state.email}
									value = {this.state.newEmail}
									onChange = {this.onChangeEmail.bind(this)}
							/>
						</div>
						<p>&emsp;</p>
						<div className="control">
							<button className="button is-primary" 
									type="submit"
									disabled={!this.state.newEmail}
									onClick={this.onUpdateEmail.bind(this)}
							>Update Email Address</button>
						</div>
					</div>	
					<br></br>
					<div className="field is-grouped">
						<div className="control">
							<input  type="password"
									size="30"
									className="input"
									placeholder="Enter new password"
									value={this.state.newPass}
									onChange={this.onChangePass.bind(this)}
							/>
						</div>
						<p>&emsp;</p>
						<div className="control">
							<button className="button is-primary"
									type="submit"
									disabled={!this.state.newPass}
									onClick={this.onUpdatePass.bind(this)}
							>Update Password</button>
						</div>
					</div>			
				</div>		
	    	</div>
	    )
  }	
}

export default UserSettings;