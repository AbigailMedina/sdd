import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './TimerComponent.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
import ButtonComponent from './buttonComponent.jsx';
import NotesComponent from './NotesComponent.jsx';

// class rendering components regarding a group's meeting page
class MeetingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: null
		}
	}

	componentDidMount() {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"			// get current project from database
  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
            console.log("project found in meeting: ",response.data.project);
            this.setState({project:response.data.project.name});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // function to reload page if switching between projects
    componentDidUpdate (prevProps) {
    	if (prevProps !== this.props) {
        	window.location.reload();
    	}
	}

  	render() {
  		const content = this.state.project;
	    return (
	    	<div className="columns" >
	    		<div className="column is-one-quarter level">
	    			<Sidebar user={this.props.user}/>
	    		</div>
	    		<div className="column is-one-quarter level" style = {{marginTop:"100px"}}>
	    			<label className="label">{content}</label>
					<TimerComponent	/><br/>
					<ButtonComponent />
	    		</div>
	    		<div className="column is-one-third level" style = {{marginTop:"100px"}}>
					<NotesComponent	{...this.props}/>
				</div>
	    	</div>
	    )
  	}
}

export default MeetingPage;
