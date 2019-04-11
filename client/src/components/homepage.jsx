import React, { Component } from 'react'
import './style.css'
import 'bulma/css/bulma.css'
import Sidebar from './sidebar';

// class rendering basic homepage with sidebar showing projects
class HomePage extends Component {
  	render() {
	    return (
	    	<div class="homepage columns">
	    		<Sidebar className="column is-one-quarter"/>
	    		<div class="column is-three-quarters "style={{marginTop:"100px"}}>
					<h2 class="title is-2">Click on a project to get started :)</h2>
				</div>				
	    	</div>
	    )
	}
}

export default HomePage;
