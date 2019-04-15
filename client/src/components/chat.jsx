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
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		const uri2 = "http://localhost:5000"

  		axios.get(`${uri2}/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({
					project:response.data.project.name,
					id : params.id
				})
            })
            .catch(function (error) {
                console.log(error);
			})
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

	fetchProjectName(props){
		const { match: { params } } = props;
		console.log(params)
		//using uri2
		axios.get(`${this.uri2}/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({
					project:response.data.project.name,
					id : params.id})
            })
            .catch(function (error) {
                console.log(error);
			})
		console.log(this.state)
	}

	componentDidUpdate(prevProps,prevState){
		console.log(prevProps)
		console.log(this.props)
		console.log(prevState)
		console.log(this.state)
		if (prevProps.match.params.id !== this.props.match.params.id){
			this.fetchProjectName(this.props)
			this.createChatManager();
		}
	}

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
				<div className=  "column is-three-quarters level" style = {{marginTop:"100px"}}>
	    			<h1>{this.state.project}</h1>
					<div className = "box" style = {{height:"700px",maxHeight:"700px","overflow-y":"scroll"}}>
						<MessageList messages = {this.state.messages}/>
					</div>
					<SendMessageForm sendMessage = {this.sendMessage}/>
				</div>
				</div>				
	    )
  }
}

export default Chat;