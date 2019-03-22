import React, { Component } from 'react'
import axios from 'axios';
import Project from '../models/Project';
export default class CreateProject extends Component {
	constructor(props){
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);

		this.onAddCollaborator = this.onAddCollaborator.bind(this);

		this.onSubmit = this.onSubmit.bind(this);

		this.submit = this.submit.bind(this);

		this.state = {
			name: "",
			email: "",
			collaborators: []
		}
	}

	onChangeName(e){
		this.setState({name:e.target.value})
	}

	onChangeEmail(e){
		this.setState({email:e.target.value})
	}

	onAddCollaborator(){
		var newArray = this.state.collaborators.slice();    
    	newArray.push(this.state.email);  
		this.setState({collaborators:newArray},
			()=>{
				this.setState({email:""})
			})
	}

	onRemoveCollaborator(removeMe){
		const list = this.state.collaborators.filter(
			function (collaborator) {
		  		return collaborator !== removeMe;
			});
		
	    this.setState({collaborators:list});
		console.log(this.state.collaborators);
	};

	onSubmit(e){
		e.preventDefault();
		// const newProject = new Project( this.state.name, this.state.collaborators );
		//axios call here sends the newProject object to the server
		// console.log("new project",newProject);
		const uri = "https://sdd-shutup.herokuapp.com"

		axios.post(uri+'/add', {name: this.state.name,collaborators: this.state.collaborators}).then(res => console.log("res.data:",res.data));

		this.setState({name:"",email:"",collaborators:[]})//to reset to original state
	}

	submit(e){
		this.onSubmit(e);
		window.location.href = "#/";
	}

	cancel(e){
		window.location.href = "#/";
	}
	
	render(){
		return(
			<div className="columns is-centered" >
				<div className="content is-half ">
				<h2>Create New Project</h2>

				<div className="field ">
				  <label className="label">Name</label>
				  <div className="control">
				    <input className="input is-info" value= {this.state.name} onChange = {this.onChangeName} type="text" placeholder="New Project Name"/>
				  </div>
				</div>

				<label className="label">Collaborator Emails</label>
				{this.state.collaborators.map((collaborator) => {
					return( 
						<li className = "level" key={collaborator}>{collaborator}
							<div className="control">
							    <button className="button is-danger" onClick={() =>
							    	this.setState({
							    		collaborators: this.state.collaborators.filter(
							    			(c) => c !== collaborator)})
							    }>Remove collaborator</button>
							</div>
						</li> 
						)
					})
				}
				<div className="field is-grouped">
				  <div className="control">
				    <input className="input is-info" value = {this.state.email} onChange = {this.onChangeEmail} type="email" placeholder="Email input" />
				  </div>
				  <div className="control">
				    <button className="button is-link" disabled={!this.state.email} onClick={this.onAddCollaborator}>Add another</button>
				  </div>
				</div>


				<div className="field is-grouped">
				  <div className="control">
				    <button type="reset" disabled={!this.state.name} onClick = {this.submit} className="button is-link">Submit</button>
				  </div>
				  <div className="control">
				    <button className="button is-text" onClick={this.cancel.bind(this)} >Cancel</button>
				  </div>
				</div>
				
                </div>
            </div>

		)
	}
}