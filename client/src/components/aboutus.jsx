import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
import './style.css'
//import MetisMenu from 'react-metismenu';
//import 'bulma/css/bulma.css'
class AboutUs extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	userId:"medina2"
	    }
	}

  	componentDidMount(props) {
  		const userId = this.state.userId;	// idk what this is???
	    
	}

  	render() {
	  	
	    return (
	    	<div class="content">
     			<h3 class="title is-2 center">About Us</h3>
      			<h4 class="subtitle is-5 center">Welcome to ShutUp! We are the developers behind your new favorite application.</h4>
          		<div class="columns has-same-height">
					       <div class="column">
        						<div class="card">
          						<div class="card-image">
            						<figure class="image is-4by3">
              						<img src={require("../photos/pragati.JPG")} alt="pragati"/>
            						</figure>
          						</div>
          					<br/>
          					<div class="center">
          						<h4>Pragati Pant</h4>
          						<p>Hi! I am a junior CS major at RPI. I interned at Fidelity Investments last summer, and 
          							will be interning at Morgan Stanley this summer. In my free time, I enjoy watching Netflix and baking.</p>
          					</div>
        				</div>
      				</div>
      				<div class="column">
        				<div class="card">
          				<div class="card-image">
            				<figure class="image is-4by3">
             					<img src={require("../photos/abby.jpg")} alt="abby"></img>
           					</figure>
           				</div>
           				<br/>
         					<div class="center">
         						<h4>Abigail Medina</h4>
         						<p>Hello! I am a junior Computer Science major at RPI. I interned at Aarazoo last summer, and will be 
         							interning at Prudential Financial this summer. I spend my free time cooking and watching Netflix.</p>
       						</div>
      					</div>
      				</div>
      				<div class="column">
        				<div class="card">
          					<div class="card-image">
            					<figure class="image is-4by3">
              						<img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image"></img>
            					</figure>
          					</div>
          					<h4>Eric Lawson</h4>
          					<p>Hi! I am a senior CS major at RPI, and starting in May 2019 I will be a full-time software engineer at X-Ray Optical Systems. I enjoy mountain climbing and watching baseball in my free time.</p>
        				</div>
      				</div>
      				<div class="column">
        				<div class="card">
          				<div class="card-image">
            				<figure class="image is-4by3">
              					<img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image"></img>
            				</figure>
          				</div>
          				<br/>
          				<div class="center">
          					<h4>Kiki Sanusi</h4>
          					<p>Hi! I'm Eric!</p>
          				</div>
        				</div>
      				</div>
      				<div class="column">
        				<div class="card">
          					<div class="card-image">
            					<figure class="image is-4by3">
              						<img src={require("../photos/ericx.jpg")} alt="eric"></img>
            					</figure>
          					</div>
          					<br/>
          					<div class="center">
          						<h4>Eric Xu</h4>
          						<p>Hi! I'm Eric! As a third year computer science student at RPI, my experience comes from projects 
          							for my classes. Working on ShutUp! has been very exciting. I have enjoyed working with other students.</p>
        						</div>
        				</div>
      				</div>
     			</div>
     		</div>
     		
      


	    )
  }
}

export default AboutUs;
