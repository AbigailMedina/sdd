import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
//import 'bulma/css/bulma.css'
class AboutUs extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"
	    }
	}

  	componentDidMount(props) {
  		const userId = this.state.userId;	// idk what this is???
	    
	}

  	render() {
	  	
	    return (
	    	<div class="content">
	    	<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />
	    		<div class="columns">
					<p class=" column is-three-quarters">welcome to the about us page!!!!!!!!!!</p>

				</div>
	    	</div>
	    )
  }
}

export default AboutUs;
