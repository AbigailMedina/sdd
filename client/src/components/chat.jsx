import React, { Component } from 'react'
import axios from 'axios';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client/react-native'
import {tokenUrl,instanceLocator} from './config/config.js'
import MessageList from './chat_components/MessageList'
import SendMessageForm from './chat_components/SendMessageForm'

import './style.css'
import 'bulma/css/bulma.css'

import Sidebar from './sidebar';
import { numberTypeAnnotation, TSImportEqualsDeclaration } from 'babel-types';

class Chat extends Component {
	constructor(props) {
		super();
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
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
		//using uri2
		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({
					project:response.data.project.name,
					id : params.id})
            })
            .catch(function (error) {
                console.log(error);
			})
		console.log(this.state)
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
	
	/*static getDerivedStateFromProps(props, state){
		console.log(props)
		console.log(state)
		if(props.match.params.id !== state.id){
			return{
				roomId: '',
				project: null,
				messages: [],
				id: null
			}
		}return null
	}*/

	fetchProjectName(props){
		const { match: { params } } = props;
		console.log(params)
		//using uri2
		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
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
	/*shouldComponentUpdate(nextProps,prevProps){
		console.log(nextProps)
		console.log(prevProps)
		if (nextProps.match.params.id !== prevProps.id){
			console.log(true)
			return true
		}else{
			console.log(false)
			return false
		}
	}*/

	createChatManager(){
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

	componentWillUnmount(){
		this.currentUser.roomSubscriptions[this.state.roomId].cancel()
	}

	render() {
	  	return (
	    		<div class="columns" >
	    			<Sidebar class="column is-one-quarter"/>
	    			<div className= "column is-three-quarters level" style = {{marginTop:"100px"}}>
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