import React, { Component } from 'react'
import axios from 'axios';

import './style.css'
import 'bulma/css/bulma.css'

import Sidebar from './sidebar';

class Chat extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
	    super(props);
	    this.state = {project:null}
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({project:response.data.project.name})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

	render() {
	  	return (
	    	<div class="chat">
	    		<div class="columns">
	    			<Sidebar class="column is-one-quarter"/>
					<p class=" column is-three-quarters">Chat page for {this.state.project}</p>
				</div>				
	    	</div>
	    )
  }
}

export default Chat;