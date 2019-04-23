import React, {Component} from 'react'
import 'bulma/css/bulma.css'

// class containing display for sending message form
class SendMessageForm extends Component{
    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // function to update state when message is sent
    onChangeMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    // function to send message when user submits
    onSubmit(e){
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render(){
        return(
            <form className = "field"
                onSubmit = {this.onSubmit}>
                <div className = "control">
                    <input className = "input"
                    onChange = {this.onChangeMessage}
                    value = {this.state.message}
                    type = "text"
                    placeholder = "Input Message and press ENTER">
                    </input>
                </div>
            </form>
        )
    }
}

export default SendMessageForm