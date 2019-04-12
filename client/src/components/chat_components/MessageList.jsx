import React, { Component } from 'react'
import Message from './Message'

import 'bulma/css/bulma.css'

class MessageList extends Component {
    render() {
        return (
            <div className = "message-list">
                {this.props.messages.map((message, index) => {
                    console.log(message.parts)
                    return(
                        <Message key = {index} 
                        username={message.senderId} 
                        text = {message.parts["0"].payload.content}/>
                    )
                })}
            </div>
        )
    }
}
export default MessageList