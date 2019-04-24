import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'

// class containing information about creating a project
class CreateProject extends Component {
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

	// function to change project name based on user input
	onChangeName(e){
		this.setState({name:e.target.value})
	}

	// function to post new project to database
	onSubmit(e){
		e.preventDefault();
  		const uri2 = "http://localhost:5000"
		axios.post(uri2+'/add', {			// currently using local host as database
			name: this.state.name,
			user: this.props.user
		}).then(res => console.log("res.data:",res.data));
		
		this.setState({name:""})	// to reset to original state
	}

	// helper function to call submit and store project information
	submit(e){
		this.onSubmit(e);
		window.location.href = "#/";
		window.location.reload();
	}

	// function to go back if user wants to cancel
	cancel(){
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
CreateProject.propTypes = {
  user: PropTypes.object.isRequired,
};
export default CreateProject;