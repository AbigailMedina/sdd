import React, { Component } from 'react'
import axios from 'axios';
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
	    	collaborators:[]
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
        })
        .catch(function (error) {
            console.log(error);
        })
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

	onAddCollaborator(){
		this.project.onAddCollaborator(this.state, this.project).then((newArray) =>{
			console.log("then newArray = ",newArray)
			this.setState({
				collaborators: newArray,
				email:""
			})
		}).catch(err=>{
			this.setState({userError:err})
		})
	}
	onRemoveCollaborator(removeMe){
		this.project.onRemoveCollaborator(removeMe, this.state.collaborators).then((newArray)=>{
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
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;