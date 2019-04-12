import React, { Component } from 'react'
import './style.css'
import MetisMenu from 'react-metismenu';
import axios from 'axios';
import 'bulma/css/bulma.css'

// class displaying current projects for a specific user on the sidebar
class Sidebar extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"		//SHOULD WE BE HARDCODING THIS USER?
	    }
	}

  	componentDidMount(props) {
  		const uri2 = "http://localhost:5000"
  		axios.get(uri2+'/users/'+this.props.user._id+'/projects').then(response => {
                this.setState({projects: Array.isArray(response.data.projects) ? response.data.projects : [response.data.projects]});
                console.log(`${this.props.user._id}'s projects:`,response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    // function to display specific user's projects
	content(){
		const content = this.state.projects
		.map((project) => 
			({
		        icon: 'icon-class-name',
		        label: project.name,
		        content: [		// display links to project specific pages
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
	    content.unshift(	// can add a new project if user wants to
	    {
            label: 'Create New Project',
            to: '#/add',
        });
	    return content;
	}

  	render() {
  		const content = this.content();
	    return (
	    	<div className="sidebar">
		    	<div class="content">
		    		<link rel="stylesheet" 
		    			type="text/css" 
		    			href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />
					<div class="sidebar">
						<MetisMenu content={content} activeLinkFromLocation/>
					</div>
		    	</div>
		    </div>
	    )
  	}
}

export default Sidebar;
