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
	    super(props);
		this.state = {
			project:null,
			roomId: '',
			messages: [],
			id: null
		}
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.fetchProjectName = this.fetchProjectName.bind(this);
		this.createChatManager = this.createChatManager.bind(this);
	}

	// function to set project information and connect to chat manager
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"

  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
            this.setState({
				project:response.data.project.name,			// get current project information
				id : params.id
			})
        })
        .catch(function (error) {
            console.log(error);
		})
		const curr_user_id = this.props.user.userId
		const chatManager = new ChatManager({			// create a new chat manager
			instanceLocator,
			userId: curr_user_id,
			tokenProvider: new TokenProvider({
				url: tokenUrl
			})
		})
		chatManager.connect()			// assign user to the correct chat room
			.then(currentUser => {
				this.currentUser = currentUser;
				var room;
				for (room in this.currentUser.rooms){
					if (this.currentUser.rooms[room].name == this.state.project){
						this.setState({
							roomId: this.currentUser.rooms[room].id
						})
						room = this.currentUser.rooms[room].id
						this.subscribeToRoom(room);
						break;
					}
				}
			}
		)
    }

    // function to get project name and set project id
	fetchProjectName(props){
		const { match: { params } } = props;
		axios.get(`${this.uri2}/projects/${params.id}`).then(response => {
            this.setState({
				project:response.data.project.name,
				id : params.id})
            })
        .catch(function (error) {
       	    console.log(error);
		})
	}

	// function to check if project id is still the same
	componentDidUpdate(prevProps,prevState){
		if (prevProps.match.params.id !== this.props.match.params.id){
			this.fetchProjectName(this.props)
			this.createChatManager();		// call function to create chat manager
		}
	}

	// function to create chat manager
	createChatManager(){
		const curr_user_id = this.props.user.userId
		const chatManager = new ChatManager({
			instanceLocator,
			userId: curr_user_id,
			tokenProvider: new TokenProvider({
				url: tokenUrl
			})
		})
		chatManager.connect()
		.then(currentUser => {
			this.currentUser = currentUser;
			var room;
			for (room in this.currentUser.rooms){
				if (this.currentUser.rooms[room].name == this.state.project){
					this.setState({
						roomId: this.currentUser.rooms[room].id
					})
					room = this.currentUser.rooms[room].id
					this.subscribeToRoom(room);
					break;
				}
			}
		})
	}

	// function to assign user's messages to correct message room
	subscribeToRoom(roomId){
		this.setState({
			messages: []
		})
		this.currentUser.subscribeToRoomMultipart({
			roomId,
			hooks: {
				onMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					})
				}
			}
		})
	}

	// function to send message to correct room
	sendMessage(text){
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		})
	}


	render() {
	  	return (
	    	<div class="columns" >
	    		<div class="column is-one-quarter level">
	    			<Sidebar user={this.props.user}/>
	    		</div>
				<div className=  "column is-three-quarters level" style = {{marginTop:"100px", marginBottom:"100px"}}>
	    			<h1>{this.state.project}</h1>
					<div className = "box" style = {{height:"400px",maxHeight:"400px","overflow-y":"scroll"}}>
						<MessageList messages = {this.state.messages}/>
					</div>
					<SendMessageForm sendMessage = {this.sendMessage} />
				</div>
			</div>				
	    )
  	}
}

export default Chat;