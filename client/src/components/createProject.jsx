import React, { Component } from 'react'
import axios from 'axios';

export default class CreateProject extends Component {
	constructor(props){
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: ' '
		}
	}

	onChangeName(e){
		this.setState({name:e.target.value})
	}
	onSubmit(e){
		e.preventDefault();
		const newProject = { name: this.state.name}
		//axios call here sends the newProject object to the server
		// console.log("new project",newProject);
		axios.post('http:\//localhost:5000/api/add',
			newProject).then(res => console.log("res.data:",res.data));

		this.setState({name:' '})//to reset to original state
	}
	
	render(){
		return(
			<div style={{marginTop: 80}}>
				<h2>Create New Project</h2>

				<form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Create Project" className="btn btn-primary" />
                    </div>
                </form>
            </div>

		)
	}
}