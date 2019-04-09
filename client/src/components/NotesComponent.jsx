import React, { Component } from 'react'
import Timer from "react-compound-timer";
import OurTimer from '../models/timer';


class NotesComponent extends Component {
	constructor(props) {
    	super(props);
    	this.state={text:"no notes"}
    	this.addInput=this.addInput.bind(this)
    	this.storeNotes=this.storeNotes.bind(this)
    	
  	}

  	addInput(e) {
  		this.setState({text:e.target.value})
  		console.log(this.state.text)
  	}

  	storeNotes() {

  	}

  	seeOldNotes() {

  	}

  	render() {
	    return (
			<div class="center" style={{maxWidth:"500px"}}>
			<h4>Notes</h4>
				<form className="field">
					<div class="control">
						<textarea class="textarea" type="text" onChange={this.addInput} placeholder="Take notes during the meeting" rows="15"></textarea>
						<div class="buttons is-centered">
							<button className="button is-info" onClick={this.storeNotes}>Save</button>
							<button class="button is-text" onClick={this.seeOldNotes}>Look at old notes</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
export default NotesComponent;