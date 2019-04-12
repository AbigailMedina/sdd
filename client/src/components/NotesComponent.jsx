import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Project from '../models/Project';
import Notes from '../models/Notes';

class NotesComponent extends Component {
	constructor(props) {
    	super(props);
    	this.project=null;
      const today=new Date()
    	this.state={text:"", date: today.getMonth()+"/"+today.getDate()+"/"+today.getFullYear()}
      this.notes=new Notes(this.state)
    	this.addInput=this.addInput.bind(this)
    	this.storeNotes=this.storeNotes.bind(this)
  	}

  	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
        this.project = new Project(response.data.project);
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  	addInput(e) {
  		this.setState({text:e.target.value})
      this.notes.update(this.state)
  	}

  	storeNotes() {
      this.notes.update(this.state)
      if (this.state.text!=="") {
        this.project.updateNotes(this.notes)
      }
      this.setState({text:""})
  	}

  	render() {
	    return (
			<div class="center" style={{maxWidth:"500px"}}>
			<h4>Take notes during the meeting</h4>
			<div class="field is-grouped">
				<h4>Date: {this.notes.date}</h4>
			</div>
				<form className="field">
					<div class="control">
						<textarea class="textarea" type="text" onChange={this.addInput} placeholder="Take notes during the meeting" rows="15"></textarea>
						<div class="buttons is-centered">
							<button className="button is-info" onClick={this.storeNotes}>Save</button>
              {this.project ?
                <Link to={'/oldnotes/'+this.project._id}>Look at past meetings' notes</Link>
              : <div></div>}
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default NotesComponent;