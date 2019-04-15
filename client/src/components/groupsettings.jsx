import React, { Component } from 'react'
import axios from 'axios';
// import nodemailer from 'nodemailer'
import './style.css'
import 'bulma/css/bulma.css'		//DIDNT FINISH THIS
import Sidebar from './sidebar';
import Project from '../models/Project';

// class containing information regarding a group's settings
class GroupSettings extends Component {
	constructor(props) {
	    super(props);
	    this.state = {		// state containing this project's data
	    	projectName:"",
	    	email:"",
	    	userError:undefined,
	    	collaborators:[],
	    	newName:""
	    }
	}

	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"		// currently using local host to connect to database
  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
            this.project = new Project(response.data.project);
            this.setState({
               	projectName:response.data.project.name,
                collaborators:response.data.project.collaborators
            })
        })
        .catch(function (error) {
            console.log(error);
        })
  
        .catch(function (error) {
            console.log(error);
        })
    }

    // Reload page if we're switching between projects
    componentDidUpdate (prevProps) {
    	if (prevProps !== this.props) {
        	window.location.reload();
    	}
	}    

    // function to change email based on user input
    onChangeEmail(e){
		this.setState({email:e.target.value,userError:undefined})
	}

	// function to show all collaborators involved with this project
	showCollaborators(){
    	var content = [];
    	if(!this.project){
    		return content
    	}
    	content = this.state.collaborators.map((collaborator) => {
		return(
			<div class="field has-addons">
				<li className = "level" key={collaborator}>{collaborator}
					<div className="column is-one-quarter">
					    <button className="button is-danger" onClick={() =>{
					    	this.onRemoveCollaborator(collaborator)
					    }}>Remove collaborator</button>
					</div>
				</li> 
			</div>
			)
		})
		return content;
    }

    // function to add new collaborator to project
	onAddCollaborator(){
		this.project.onAddCollaborator(this.state, this.project).then((newArray) =>{
			console.log("then newArray = ",newArray)
			this.setState({
				collaborators: newArray,
				email:""
			})
		}).catch(err=>{
			this.setState({userError:err})
		});this.sendMail()
	}

	// function to remove collaborator from project
	onRemoveCollaborator(removeMe){
		this.project.onRemoveCollaborator(removeMe, this.state.collaborators).then((newArray) =>{
			this.setState({collaborators: newArray});
		})
	}

	// function to update new name from input field
	onChangeName(e) {
		this.setState({newName:e.target.value});
	}

	// function to update project's name
	onUpdateName() {
		this.project.onChangeName(this.state.newName).then((newName) => {
			this.setState({projectName:newName,newName:""})
		})
		window.location.reload();
	}
    
	render() {
		const collaborators = this.showCollaborators.bind(this);
	  	return (
	    	<div class="groupsettings columns">
	    		<div class="column is-one-quarter level">
	    			<Sidebar user={this.props.user}/>
	    		</div>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">Group Settings for {this.state.projectName}</h2>
					<label className="label">Collaborator Emails</label>
					
					<span>{collaborators()}</span>					
					<div className="field is-grouped">
					 	<div className="control">
					    	<input 
						    	className={this.state.userError?"input is-danger":"input is-info"} 
						    	value = {this.state.userError? this.state.userError:this.state.email} 
						    	onChange = {this.onChangeEmail.bind(this)} type="email" placeholder="Email input" />
						</div>
					  	<div className="control">
						    <button 
						    	className="button is-link" 
						    	disabled={!this.state.email} 
						    	onClick={this.onAddCollaborator.bind(this)}>Add another</button>
						</div>
					</div>
					<br></br>
					<label className="label">Project Name</label>
					<div className="field is-grouped">
						<div className="control">
							<input  type="text"
									size="30"
									className="input"
									placeholder={this.state.projectName}
									value={this.state.newName}
									onChange={this.onChangeName.bind(this)}
							/>
						</div>
						<p>&emsp;</p>
						<div className="control">
							<button className="button is-primary"
									type="submit"
									disabled={!this.state.newName}
									onClick={this.onUpdateName.bind(this)}
							>Update Name</button>
						</div>
					</div>
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;