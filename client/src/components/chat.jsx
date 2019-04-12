import React, { Component } from 'react'
import axios from 'axios';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client/react-native'
import {tokenUrl,instanceLocator} from './config/config.js'
import MessageList from './chat_components/MessageList'
import SendMessageForm from './chat_components/SendMessageForm'

import './style.css'
import 'bulma/css/bulma.css'

import Sidebar from './sidebar';

class Chat extends Component {
	constructor(props) {
		super();
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
	    super(props);
		this.state = {
			project:null,
			messages: []
		}

		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
	}
	componentDidMount(props) {
		const chatManager = new ChatManager({
			instanceLocator,
			userId: 'sanusk',
			tokenProvider: new TokenProvider({
				url: tokenUrl
			})
		})
		chatManager.connect()
			.then(currentUser => {
				this.currentUser = currentUser;
				this.subscribeToRoom();
			})
		/*
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({project:response.data.project.name})
            })
            .catch(function (error) {
                console.log(error);
			})
		*/
		}
		

	subscribeToRoom(){
		this.currentUser.subscribeToRoomMultipart({
			roomId: '19389417',
			hooks: {
				onMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					})
				}
			}
		})
	}

	sendMessage(text){
		this.currentUser.sendMessage({
			text,
			roomId: '19389417'
		})
	}

	render() {
	  	return (
	    		<div class="columns" >
	    			<Sidebar class="column is-one-quarter"/>
	    			<div className= "column is-three-quarters level" style = {{marginTop:"100px"}}>
						<MessageList messages = {this.state.messages}/>
						<SendMessageForm sendMessage = {this.sendMessage}/>
					</div>
				</div>				
	    )
  }
}

export default Chat;