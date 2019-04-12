import React, {Component} from 'react';
import axios from 'axios';

// classing containing and displaying sign up information for a new user
class SignUp extends Component{
    constructor(props){
        super(props);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserId =  this.onChangeUserId.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserPassword =  this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {      // set empty state for new user
            name: '',
            userId: '',
            email: '',
            password: ''
        }
    }

    // function to update user name based on user input
    onChangeUserName(e){
        this.setState({
            name:e.target.value
        })
    }

    // function to update user ID based on user input
    onChangeUserId(e){
        this.setState({
            userId:e.target.value
        })
    }

    // function to update email address based on user input
    onChangeUserEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    // function to update user password based on user input
    onChangeUserPassword(e){
        this.setState({
            password:e.target.value
        })
    }

    // function to store new user information in database
    onSubmit(e){
        e.preventDefault();
        console.log('Form submitted:');
        console.log(`User Info: ${this.state.name}`);       //NEED TO TAKE THESE OUT
        console.log(`User Info: ${this.state.userId}`);
        console.log(`User Info: ${this.state.email}`);
        console.log(`User Info: ${this.state.password}`);
        
        const newUser = {
            name: this.state.name,      // make a new user based on user input given
            userId: this.state.userId,
            email: this.state.email,
            password: this.state.password,
            projects:[]
        }//TODO: call new User here instead of plain JSON object
        
        const uri2 = "https://sdd-shutup.herokuapp.com"
        axios.post(uri2+'/users', newUser).then(res =>{console.log("res:data", res.data)})
        
        this.setState({     // reset state for next new user
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
                                onChange = {this.onChangeUserName} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input  type="text" 
                                className="input"
                                placeholder = "jdoe2"
                                value = {this.state.userId}
                                onChange = {this.onChangeUserId} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input  type="email" 
                                className="input"
                                placeholder = "jdoes2@everest.org"
                                value = {this.state.email}
                                onChange = {this.onChangeUserEmail} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input  type="password" 
                                className="input"
                                placeholder = "Password"
                                value = {this.state.password}
                                onChange = {this.onChangeUserPassword} />
                        </div>
                    </div>
                    <div className ="field">
                        <button className="button is-primary"
                            type ="submit"
                            value="Signup">Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;