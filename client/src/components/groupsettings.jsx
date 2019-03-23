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
                this.setState({
                	projectName:response.data.project.name,
                	collaborators:response.data.project.collaborators})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    showCollaborators(){
    	// console.log("collaborators1",this.state.collaborators)    	
    	var content = this.state.collaborators.map((collaborator) => {
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
	updateProject(newArray){
		const { match: { params } } = this.props;

		axios.patch(`http://localhost:5000/projects/${params.id}`,{collaborators:newArray}).then(response => {
            console.log("updated project: ",response.data.project)
            this.setState({
            	projectName:response.data.project.name,
            	collaborators:response.data.project.collaborators})
        })
        .catch(function (error) {
            console.log(error);
        })
	}
	onAddCollaborator(){
		//verify that email == a real user
		//using uri2 for local development
		axios.get(`http://localhost:5000/users/${this.state.email}`).then(response => {
            console.log("user found in groupSettings: ",response.data.user)
           	var newArray = this.state.collaborators.slice();    
	    	newArray.push(this.state.email);  
			this.setState({collaborators:newArray},
				()=>{
					this.setState({email:""});
					this.updateProject(newArray)
				})
        })
        .catch( error =>{
            console.log(error);
            this.setState({userError:true})
        })
        
	}
	onRemoveCollaborator(removeMe){
		const newArray = this.state.collaborators.filter(
			function (collaborator) {
		  		return collaborator !== removeMe;
			});
		
	    this.setState({collaborators:newArray});
		console.log(this.state.collaborators);

		this.updateProject(newArray)
		
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