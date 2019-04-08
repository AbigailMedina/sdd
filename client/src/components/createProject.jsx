import React, { Component } from 'react'
import axios from 'axios';
import Project from '../models/Project';
export default class CreateProject extends Component {
	constructor(props){
		super(props);
		this.onChangeName = this.onChangeName.bind(this);

		this.onSubmit = this.onSubmit.bind(this);
		this.submit = this.submit.bind(this);

		this.state = {
			name: "",
			userError:false
		}
	}

	onChangeName(e){
		this.setState({name:e.target.value})
	}

	onSubmit(e){
		e.preventDefault();
		
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"

		axios.post(uri2+'/add', {
			name: this.state.name,
		}).then(res => console.log("res.data:",res.data));

		this.setState({name:""})//to reset to original state
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