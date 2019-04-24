import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Project from '../models/Project';
import Notes from '../models/Notes';

// class containing information about creating and displaying notes
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

  	componentDidMount() {
  		const { match: { params } } = this.props;
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
        this.project = new Project(response.data.project);      // get current project for user
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    // function to add notes input
  	addInput(e) {
  		this.setState({text:e.target.value})
      this.notes.update(this.state)   // update notes content within notes object
  	}

    // function to store notes within current project
  	storeNotes(e) {
      e.preventDefault();
      this.notes.update(this.state)  
      if (this.state.text!=="") {     // only add notes if actual text was inputted
        this.project.updateNotes(this.notes)
      }
      this.setState({text:""})    // reset state to take more notes
      
  	}

  	render() {
	    return (
			<div className="center" style={{maxWidth:"500px"}}>
			<h4>Take notes during the meeting</h4>
			<div className="field is-grouped">
				<h4>Date: {this.notes.date}</h4>
			</div>
				<form className="field">
					<div className="control">
						<textarea className="textarea" 
              type="text" 
              value={this.state.text} 
              onChange={this.addInput} 
              placeholder="Take notes during the meeting" 
              rows="15">
            </textarea>
						<div className="buttons is-centered">
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