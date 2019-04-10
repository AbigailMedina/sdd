import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Project from '../models/Project';


class NotesComponent extends Component {
	constructor(props) {
    	super(props);
    	this.project=null;
    	this.state={text:"no notes", date:"00/00/0000"}
    	this.addInput=this.addInput.bind(this)
    	this.addDate=this.addDate.bind(this)
    	this.storeNotes=this.storeNotes.bind(this)
  	}

  	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                this.project = new Project(response.data.project);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

  	addInput(e) {
  		this.setState({text:e.target.value})
  		console.log(this.state.text)
  	}

  	addDate(e) {
  		this.setState({date:e.target.value})
  		console.log(this.state.date)
  	}

  	storeNotes() {
  		this.project.updateNotes(this.state)
  	}

  	render() {
	    return (
			<div class="center" style={{maxWidth:"500px"}}>
			<h4>Notes</h4>
			<div class="field is-grouped">
				<h4>Date:</h4>
				<input class="input" type="text" onChange={this.addDate} placeholder="00/00/0000" />
				<button className="button is-info" onClick={this.addDate}>Save</button>
			</div>
				<form className="field">
					<div class="control">
						<textarea class="textarea" type="text" onChange={this.addInput} placeholder="Take notes during the meeting" rows="15"></textarea>
						<div class="buttons is-centered">
							<button className="button is-info" onClick={this.storeNotes}>Save</button>
							<Link to={'/oldnotes'}>Look at past meetings' notes</Link>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
export default NotesComponent;