import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
//import axios from 'axios';
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';
class HomePage extends Component {
	constructor(props) {
	    super(props);
	}

  	render() {
	  	
	    return (
	    	<div class="homepage">
	    		<Sidebar/>
	    		<div class="columns">
					<p class=" column is-three-quarters">hi, this is homepage</p>
				</div>				
	    	</div>
	    )
  }
}

export default HomePage;
