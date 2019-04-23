import React from 'react'

// functional component holding one message
function Message(props){
    return(
        <div className = "message">
            <div className = "message-username">{props.username}</div>
            <div>{props.text}</div>
        </div>
    )
}

export default Message