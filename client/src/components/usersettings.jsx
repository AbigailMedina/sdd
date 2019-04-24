import React, { Component } from 'react'
import axios from 'axios';
import './style.css'
import Sidebar from './sidebar';
import User from '../models/User';
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

// class containing information about user settings for a specific user
class UserSettings extends Component {
	constructor(props) {
	  	super(props);
	    this.user = null;
	    this.state = {		// initializing state for current user
	    	name:null,
	    	email:null,
	    	password:null,
	    	projects:[],
	    	newEmail:"",
	    	newPass:""
	    }
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		axios.get(`http://localhost:5000/users/${params.id}`).then(response => {
			this.user = new User(response.data.user);		// get information from database for this user
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

	// function to dislplay user's projects and render remove button
	showProjects() { 
		var content = [];
		if(!this.user) { 
			return content;
		}
		content = this.state.projects.map((project) => {
		return(
			<div key={project._id} className="field has-addons">
				<li className = "level" key={project}>{project.name}
					<div className="column is-one-quarter">
					    <button className="button is-danger" onClick={() =>{
					    	this.onRemoveProject(project)
					    	}}>Leave project
					    </button>
					</div>
				</li> 
			</div>
			)		
		})
		return content;
	}

	// function to remove user from project
	onRemoveProject(removeMe) {
		this.user.onRemoveProject(removeMe).then((newArray) => {
			this.setState({projects: newArray});
		})
	}

	// function to update new email from input field
	onChangeEmail(e) {
		this.setState({
			newEmail:e.target.value
		})
	}

	// function to update user's email address
	onUpdateEmail() {
		this.user.onChangeEmail(this.state.newEmail).then((newEmail) => {
			this.setState({email:newEmail, newEmail:""})
		})	
	}

	// function to update new password from input field
	onChangePass(e) {
		this.setState({
			newPass:e.target.value
		})
	}

	// function to update user's password
	onUpdatePass() {
		this.user.onChangePassword(this.state.newPass).then((newPass) => {
			this.setState({password:newPass,newPass:""})
		})
	}

	// function to update user's information
	updateUser(newArray) {
		const { match: { params } } = this.props;
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
	    	<div className="groupsettings columns">
	    		<div className="column is-one-quarter level">
	    			<Sidebar user={this.props.user}/>
	    		</div>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 className="title is-2">User Settings for {this.state.name}</h2>
					<label className="label">Projects you're a member of</label>	
					<span>{projects()}</span>	
					<br/>
					<label className="label">Email Address</label>
					<div className="field is-grouped">
						<div className="control">
							<input type="email"
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
								onClick={this.onUpdateEmail.bind(this)}>
								Update Email Address
							</button>
						</div>
					</div>	
					<br></br>
					<label className="label">Password</label>
					<div className="field is-grouped">
						<div className="control">
							<input type="password"
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
								onClick={this.onUpdatePass.bind(this)}>
								Update Password
							</button>
						</div>
					</div>			
				</div>		
	    	</div>
	    )
  	}	
}
UserSettings.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserSettings;