import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
import MetisMenu from 'react-metismenu';
//import 'bulma/css/bulma.css'
class HomePage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"
	    }
	}

  	componentDidMount(props) {
  		const userId = this.state.userId;
	    fetch('/api/'+userId+'/projects')
	      .then(res => res.json())
	      .then(projects => this.setState({projects}, () => console.log('Projects fetched...', projects)));
	}
	content(){
		const content = this.state.projects.map((project) => 
			({
		        icon: 'icon-class-name',
		        label: project.title,
		        content: [
		            {
		                icon: 'icon-class-name',
		                label: 'group settings',
		                to: '#',
		            },
		            {
		                icon: 'icon-class-name',
		                label: 'group meeting',
		                to: '#',
		            },
		            {
		                icon: 'icon-class-name',
		                label: 'group chat',
		                to: '#',
		            },
		        ],
		    })
	    )
	    console.log("content: ",content);
	    return content;
	}

  	render() {
  		const content = this.content();
	  	
	    return (
	    	<div class="content">
	    	<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />
	    		<div class="columns">

					<div class="sidebar column is-one-quarter">
						<MetisMenu content={content} activeLinkFromLocation/>
					</div>
					<p class=" column is-three-quarters">hi, this is homepage</p>

				</div>
	    	</div>
	    )
  }
}

export default HomePage;
