import React , {Component} from 'react'


//Functional Component

function Message(props){
    return(
        <div className = "message">
            <div className = "message-username">{props.username}</div>
            <div>{props.text}</div>
        </div>
    )
}

export default Message