import React, {Component} from 'react'

import 'bulma/css/bulma.css'

class SendMessageForm extends Component{

    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeMessage(e){
        this.setState({
            message: e.target.value
        })
    }


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