import React, { Component } from 'react'
import axios from 'axios';

import './style.css'
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';
import Project from '../models/Project';

class GroupSettings extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"

  		const project=null;
	    super(props);

	    this.state = {
	    	projectName:"",
	    	email:"",
	    	userError:false,
	    	collaborators:[]
	    }
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                this.project = new Project(response.data.project);
                this.setState({
                	projectName:response.data.project.name,
                	collaborators:response.data.project.collaborators
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeEmail(e){
		this.setState({email:e.target.value,userError:false})
	}

	showCollaborators(){
    	var content = [];
    	if(!this.project){
    		return content
    	}
    	content = this.state.collaborators.map((collaborator) => {
		return( 
			<li className = "level" key={collaborator}>{collaborator}
				<div className="control">
				    <button className="button is-danger" onClick={() =>{
				    	this.onRemoveCollaborator(collaborator)
				    }}>Remove collaborator</button>
				</div>
			</li> 
			)
		})
		return content;
    }

	updateProject(newArray){
		const { match: { params } } = this.props;
		console.log("in groupSettings updateProject. updating with newArray:",newArray)
		this.project.update(params.id,newArray).then((response) =>{
	    	this.setState({
	        	projectName:response.data.project.name,
	        	collaborators:response.data.project.collaborators,
	        	email:""
	        })
		})
	}
	onAddCollaborator(){
		const newArray = this.project.onAddCollaborator(this.state).then((newArray) =>{
			this.setState({
				collaborators: newArray,
				email:""
			})
		}).catch(err =>{
			this.setState({userError:true})
		})
	}
	onRemoveCollaborator(removeMe){
		this.project.onRemoveCollaborator(removeMe, this.state.collaborators).then((newArray) =>{
			this.setState({collaborators: newArray});
		})
	}
    
	render() {
		const collaborators = this.showCollaborators.bind(this);
	  	return (
	    	<div class="groupsettings columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">Group Settings for {this.state.projectName}</h2>
					<label className="label">Collaborator Emails</label>
					
					<span>{collaborators()}</span>					
					<div className="field is-grouped">
					 	<div className="control">
					    	<input 
						    	className={this.state.userError?"input is-danger":"input is-info"} 
						    	value = {this.state.userError? "User does not exist":this.state.email} 
						    	onChange = {this.onChangeEmail.bind(this)} type="email" placeholder="Email input" />
						</div>
					  	<div className="control">
						    <button 
						    	className="button is-link" 
						    	disabled={!this.state.email} 
						    	onClick={this.onAddCollaborator.bind(this)}>Add another</button>
						</div>
					</div>
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;