import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
//import axios from 'axios';
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';
class HomePage extends Component {

  	render() {
	  	
	    return (
	    	<div class="homepage columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div class="column is-three-quarters">
					<p >hi, this is homepage</p>
				</div>				
	    	</div>
	    )
  }
}

export default HomePage;
