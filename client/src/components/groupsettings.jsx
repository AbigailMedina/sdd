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
	    	project:{},
	    	projectName:"",
	    	collaborators:[],
	    	email:"",
	    	userError:false
	    }
	    this.showCollaborators.bind(this)
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.project = new Project(response.data.project);
                console.log("this.project ===>",this.project)
                this.setState({
                	project:response.data.project,
                	projectName:response.data.project.name,
                	collaborators:response.data.project.collaborators})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    showCollaborators(){
    	var content = [];
    	if(!this.project){
    		return content
    	}
    	content = this.project.collaborators.map((collaborator) => {
		return( 
			<li className = "level" key={collaborator}>{collaborator}
				<div className="control">
				    <button className="button is-danger" onClick={() =>{
				    	console.log("remove", collaborator)
				    	this.onRemoveCollaborator(collaborator)
				    }}>Remove collaborator</button>
				</div>
			</li> 
			)
		})
		return content;
    }
    onChangeEmail(e){
		this.setState({email:e.target.value,userError:false})
	}
	async updateProject(newArray){
		const { match: { params } } = this.props;
		const response = await this.project.update(params.id,newArray)
		console.log("response", response);
    	this.setState({
        	projectName:response.data.project.name,
        	collaborators:response.data.project.collaborators
        })

		  
		
	}
	async onAddCollaborator(){
		console.log("here",this.project);
		const newArray = await this.project.onAddCollaborator(this.state)
		this.setState({collaborators: newArray},
		()=>{
			console.log(this.state.collaborators)
			this.setState({email:""});
			this.updateProject(newArray)
		})
		
        
	}
	async onRemoveCollaborator(removeMe){
		const newArray = await this.project.onRemoveCollaborator(removeMe)
		this.setState({collaborators: newArray},
    	()=>{
    		console.log(this.state.collaborators);
			this.updateProject(newArray);
    	});
	    
		
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