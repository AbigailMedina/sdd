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
<<<<<<< HEAD

					<div class="sidebar column is-one-quarter">
						<MetisMenu content={content} activeLinkFromLocation/>
					</div>
			
					<p class=" column is-three-quarters">hi, this is homepage</p>

				</div>

				


				

				
=======
					<p class="column is-three-quarters">hi, this is homepage</p>
				</div>				
>>>>>>> 1bd0604f36f15121905edd698fb520b0cd67180f
	    	</div>
	    )
  }
}

export default HomePage;
