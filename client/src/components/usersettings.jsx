import React, { Component } from 'react'

import './style.css'

import Sidebar from './sidebar';

import 'bulma/css/bulma.css'
class UserSettings extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
	  	return (
	    	<div class="usersettings">
	    		<Sidebar/>
	    		<div class="columns">
					<p class=" column is-three-quarters">hi, this is user settings</p>
				</div>				
	    	</div>
	    )
  }
}

export default UserSettings;