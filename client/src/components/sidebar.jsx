import React, { Component } from 'react'

import './style.css'
import MetisMenu from 'react-metismenu';
import axios from 'axios';
import 'bulma/css/bulma.css'

class Sidebar extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"
	    }
	}

  	componentDidMount(props) {
  		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"

  		axios.get(uri2+'/projects').then(response => {
                this.setState({projects: Array.isArray(response.data) ? response.data : [response.data]});
                console.log(this.state.projects)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
	content(){
		const content = this.state.projects
		.map((project) => 
			({
		        icon: 'icon-class-name',
		        label: project.name,
		        content: [
		            {
		                icon: 'icon-class-name',
		                label: 'group settings',
		                to: '#/groupsettings/'+project._id,
		            },
		            {
		                icon: 'icon-class-name',
		                label: 'group meeting',
		                to: '#/meeting/'+project._id,
		            },
		            {
		                icon: 'icon-class-name',
		                label: 'group chat',
		                to: '#/chat/'+project._id,
		            },
		        ],
		    })
	    )
	    content.unshift(
	    {
            label: 'Create New Project',
            to: '#/add',
        });
	    console.log("content: ",content);
	    return content;
	}

  	render() {
  		const content = this.content();
	  	
	    return (
	    	<div className="sidebar">
		    	<div class="content">
		    	<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />
					<div class="sidebar">
						<MetisMenu content={content} activeLinkFromLocation/>
					</div>
		    	</div>
		    </div>
	    )
  }
}

export default Sidebar;
