import React, {Component} from 'react';
import axios from 'axios';
import { throwStatement } from 'babel-types';

class SignUp extends Component{
    
    constructor(props){
        super(props);

        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserId =  this.onChangeUserId.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserPassword =  this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            userId: '',
            email: '',
            password: ''
        }
    }

    onChangeUserName(e){
        this.setState({
            name:e.target.value
        })
    }

    onChangeUserId(e){
        this.setState({
            userId:e.target.value
        })
    }

    onChangeUserEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangeUserPassword(e){
        this.setState({
            password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        console.log('Form submitted:');
        console.log(`User Info: ${this.state.name}`);
        console.log(`User Info: ${this.state.userId}`);
        console.log(`User Info: ${this.state.email}`);
        console.log(`User Info: ${this.state.password}`);
        
        const newUser = {
            name: this.state.name,
            userId: this.state.userId,
            email: this.state.email,
            password: this.state.password
        }
        const uri = "https://sdd-shutup.herokuapp.com"
        axios.post(uri+'/users', newUser).then(
            function(res){
                console.log("res:data", res.data)
            }
        )
        this.setState({
            name: '',
            userId: '',
            email: '',
            password: ''
        })
    }

    render(){
        return (
            <div className="columns is-centered" style={{marginTop: 80 }}>
                <form className="column is-half " onSubmit = {this.onSubmit}>
                    <h2 class="title is-2">Sign Up</h2>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input  type="text" 
                                    className="input"
                                    placeholder = "John Doe"
                                    value = {this.state.name}
                                    onChange = {this.onChangeUserName}
                                    />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input  type="text" 
                                    className="input"
                                    placeholder = "jdoe2"
                                    value = {this.state.userId}
                                    onChange = {this.onChangeUserId}
                                    />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input  type="email" 
                                    className="input"
                                    placeholder = "jdoes2@everest.org"
                                    value = {this.state.email}
                                    onChange = {this.onChangeUserEmail}
                                    />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input  type="password" 
                                    className="input"
                                    placeholder = "Password"
                                    value = {this.state.password}
                                    onChange = {this.onChangeUserPassword}
                                    />
                        </div>
                    </div>
                    <div className ="field">
                    <button     className="button is-primary"
                                type ="submit"
                                value="Signup">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;