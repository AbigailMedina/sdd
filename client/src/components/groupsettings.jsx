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
    	console.log("collaborators1",this.state.collaborators)
    	var content = this.state.collaborators.slice()
    	if(content.length == 0 ){
    		console.log("no collaborators")
    		return(
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
    		)
    	}else{
    		
			content = this.state.collaborators.map((collaborator) => {
				return(
				<li className = "level" key={collaborator}>{collaborator}
					<div className="control">
					    <button className="button is-danger" onClick={() =>
					    	console.log("remove", collaborator)
					    	//will send patch here to /projects/:id/removeUser/:userID
					    }>Remove collaborator</button>
					</div>
				</li> 
			)
			})
			console.log("collaborators:",content)
			return content;
			
    	}		
    }
    onChangeEmail(e){
		this.setState({email:e.target.value,userError:false})
	}
	onAddCollaborator(){
		//verify that email == a real user
		//using uri2 for local development
		axios.get(`http://localhost:5000/users/${this.state.email}`).then(response => {
            console.log("user found in createProject: ",response.data.user)
           	var newArray = this.state.collaborators.slice();    
	    	newArray.push(this.state.email);  
			this.setState({collaborators:newArray},
				()=>{
					this.setState({email:""})
				})
        })
        .catch( error =>{
            console.log(error);
            this.setState({userError:true})
        })
	}
    
	render() {
		const collaborators = this.showCollaborators.bind(this);
	  	return (
	    	<div class="groupsettings columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div className="column is-three-quarters" style={{marginTop:"100px"}}>
	    			<h2 class="title is-2">Group Settings for {this.state.projectName}</h2>
					<label className="label" onClick={this.showCollaborators.bind(this)}>Collaborator Emails</label>
					<span>{collaborators()}</span>
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;