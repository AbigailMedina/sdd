import React, { Component } from 'react'
import './style.css'

// class rendering information about developers for the About Us page
class AboutUs extends Component {
  	render() {
	    return (
	    	<div className="content">
     			<h3 className="title is-2 center">About Us</h3>
      			<h4 className="subtitle is-5 center">Welcome to ShutUp! We are the developers behind your new favorite application.</h4>
          		<div className="columns has-same-height">
					<div className="column">
        				<div className="card">
          					<div className="card-image">
            					<figure className="image is-4by3">
              						<img src="pragati.JPG" alt="pragati"/>
            					</figure>
          					</div>
                            <br/>
          					<div className="center">
          						<h4>Pragati Pant</h4>
          						<p>Hi! I am a junior CS major at RPI. I interned at Fidelity Investments last summer, and 
          							will be interning at Morgan Stanley this summer. In my free time, I enjoy watching Netflix and baking.</p>
          					</div>
        				</div>
      				</div>
      				<div className="column">
        				<div className="card">
                            <div className="card-image">
            				    <figure className="image is-4by3">
                                    <img src="abby.jpg" alt="abby"></img>
           					    </figure>
                            </div>
                            <br/>
         					<div className="center">
         						<h4>Abigail Medina</h4>
                                <p>Hello! I am a junior Computer Science major at RPI. I interned at Aarazoo last summer, and will be 
         						interning at Prudential Financial this summer. I spend my free time cooking and watching Netflix.</p>
       					    </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
            				    <figure className="image is-4by3">
                                    <img src="ericl.jpg" alt="eric"></img>
            				    </figure>
                            </div>
         					<br/>
         					<div className="center">
         						<h4>Eric Lawson</h4>
         						<p>Hi! I am a senior CS major at RPI, and starting in May 2019 I will be a full-time software engineer at X-Ray Optical Systems. 
                                I enjoy mountain climbing and watching baseball in my free time.</p>
        					</div>
        				</div>
      				</div>
                    <div className="column">
                        <div className="card">
                            <div className="card-image">
            				    <figure className="image is-4by3">
                                    <img src="kiki.jpg" alt="Kiki"></img>
                                </figure>
                            </div>
                            <br/>
                            <div className="center">
                                <h4>Kikiola Sanusi</h4>
                                <p>My name is Kikiola Sanusi and I am a junior Computer Science major at RPI. I enjoy playing volleyball and video games. This summer,
								                  I'll be interning at Santander Bank in Dorchester, MA!
				  		                  </p>
                            </div>
                        </div>
                    </div>
      			   <div className="column">
                        <div className="card">
                            <div className="card-image">
          			           <figure className="image is-4by3">
            					   <img src="ericx.jpg" alt="eric"></img>
          				      </figure>
          			       </div>
          			       <br/>
        				    <div className="center">
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
