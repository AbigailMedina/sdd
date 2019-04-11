import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Project from '../models/Project';

class OldNotesPage extends Component {
	constructor(props) {
    	super(props);
    	this.state = {		// state containing this project's notes
	    	notes:[]
	    }
  	}

  	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"		// currently using local host to connect to database
  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
  			console.log(response)
            this.setState({
                notes:response.data.project.notes
            })
        })
  	}

  	render() {
    	return (
    		<div style={{marginTop:"100px"}}>
    		<h2>Past Notes from Meetings</h2>
    		{this.state.notes.map((note, index) => (
    			<div class="box">
        			<p>Taken on {note.date}:</p>
        			<p>{note.text}</p>
        		</div>
    		))}
    		</div>
    	)
   	}
}
export default OldNotesPage;