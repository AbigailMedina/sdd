import React, { Component } from 'react'

import './style.css'

import Sidebar from './sidebar';

import 'bulma/css/bulma.css'
class Chat extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
	  	return (
	    	<div class="chat">
	    		<Sidebar/>
	    		<div class="columns">
					<p class=" column is-three-quarters">hi, this is chat</p>
				</div>				
	    	</div>
	    )
  }
}

export default Chat;