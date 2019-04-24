import React, { Component } from 'react'
import axios from 'axios';
import Notes from '../models/Notes';

class OldNotesPage extends Component {
	constructor(props) {
    	super(props);
    	this.state = {		// state containing this project's notes
	    	notes:[]
	    }
	    this.id=null
  	}

  	componentDidMount() {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"		// currently using local host to connect to database and get all notes
  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
  			console.log(response)
  			this.id=params.id
            this.setState({
                notes:response.data.project.notes
            })
        })
  	}

    // function to render all notes for a project
  	render() {
    	return (
    		<div style={{marginTop:"100px", marginBottom:"70px"}}>
    		<h2 className="center">Past Notes from Meetings</h2>
    			<div className="columns is-centered">	
    				<div className="column is-two-thirds">
    				<button className="button is-info" onClick={()=> {window.location.href='#/meeting/'+this.id }}> Go back </button>
    					{this.state.notes.map((note) => {
    						const newNote= new Notes(note)
    						if (newNote) {
    							return (
    								<div className="box" style={{textAlign:"left"}}>
        								<p>Taken on {newNote.date}:</p>
        								<pre>{newNote.text}</pre>
        							</div>
    							)
    						}
    					})}
    				</div>
    			</div>
    		</div>
    	)
   	}
}

export default OldNotesPage;