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
              						<img src={require("./photos/pragati.JPG")} alt="pragati"/>
            					</figure>
          					</div>
          					<br></br>
          					<div class="center">
          						<h4>Pragati Pant</h4>
          						<p>Hi! I am a junior CS major at RPI. My experience at RPI (more specifically within my major) prompted me to come up with the idea of ShutUp!. I feel this application provides a much needed
          							groupwork platform, especially among group members with different skill-levels and backgrounds. I'm very exited about this project, and really enjoyed building 
          							this application. I hope you find ShutUp! useful in any way possible!</p>
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
          					<h4>Abigail Medina</h4>
          					<p>Hi! I'm Eric!</p>
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
          					<p>Lorem ipsum fuck this shit.</p>
        				</div>
      				</div>
      				<div class="column">
        				<div class="card">
          					<div class="card-image">
            					<figure class="image is-4by3">
              						<img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image"></img>
            					</figure>
          					</div>
          					<h4>Kiki Sanusi</h4>
          					<p>Hi! I'm Eric!</p>
        				</div>
      				</div>
      				<div class="column">
        				<div class="card">
          					<div class="card-image">
            					<figure class="image is-4by3">
              						<img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image"></img>
            					</figure>
          					</div>
          					<h4>Eric Xu</h4>
          					<p>Hi! I'm Eric! As a third year computer science student at RPI, most of my experience comes from projects for my undergraduate course curriculum. Working on the ShutUp! web application has been very exciting as I have had the opportunity to work with other CS students with various backgrounds. Also, I have gotten to explore and learn to use many new technologies for developing ShutUp! All in all, this project has been great to work on and I hope you all find it useful.</p>
        				</div>
      				</div>
     			</div>
     		</div>
     		
      


	    )
  }
}

export default AboutUs;
