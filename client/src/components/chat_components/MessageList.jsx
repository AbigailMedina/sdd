import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import 'bulma/css/bulma.css'

// class displaying messages on chat component
class MessageList extends Component {
    
    // function to allow user to scroll up and see old messages
    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    // function that scrolls the message list down when a new message is received
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
                    var count = 0                       // to prevent the rare case of same message popping up more than once
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