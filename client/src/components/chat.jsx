import React, { Component } from 'react'
import axios from 'axios';
import './style.css'
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';

class Chat extends Component {
	constructor(props) {
  		
	    super(props);
	    this.state = {project:null}
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"

  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({project:response.data.project.name})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

	render() {
	  	return (
	    		<div class="columns" >
	    			<Sidebar user={this.props.user} class="column is-one-quarter"/>
	    			<div class="column is-three-quarters level" style = {{marginTop:"100px"}}>
						<h2 className="title is-2 ">Chat page for {this.state.project}</h2>
					</div>
				</div>				
	    )
  }
}

export default Chat;