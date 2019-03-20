import React, { Component } from 'react'

import './style.css'

import Sidebar from './sidebar';

import 'bulma/css/bulma.css'
class GroupSettings extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
	  	return (
	    	<div class="groupsettings">
	    		<Sidebar/>
	    		<div class="columns">
					<p class=" column is-three-quarters">hi, this is group settings</p>
				</div>				
	    	</div>
	    )
  }
}

export default GroupSettings;