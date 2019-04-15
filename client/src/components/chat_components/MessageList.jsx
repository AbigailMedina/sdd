import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

import 'bulma/css/bulma.css'

class MessageList extends Component {
    
    // If you are viewing previous messages, the page will not put you at the bottom upon receiving
    // a new message
    // * Doesn't work because styles need to applied messages list and not the container above it *
    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    // This scrolls the message list down when a new message is received
    // * Doesn't work because styles need to applied messages list and not the container above it *
    componentDidUpdate() {
        if (this.shouldScrollToBottom){
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }
    render() {
        return (
            <div className = "message-list">
                {this.props.messages.map((message) => {
                    // To prevent the rare case of same message popping up more than once
                    var count = 0
                    for (const key in this.props.messages) {
                        if (this.props.messages[key].id === message.id) {
                            if(count == 1){
                                this.props.messages.pop()
                                break;
                            }
                            count++;
                        }
                    }
                    return(
                        <Message key = {message.id} 
                        username={message.senderId} 
                        text = {message.parts["0"].payload.content}/>
                    )
                })}
            </div>
        )
    }
}
export default MessageList