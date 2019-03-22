import React, { Component } from 'react'
import './style.css'
import Sidebar from './sidebar';
import TimerComponent from './timer.jsx';
import axios from 'axios';
import 'bulma/css/bulma.css'
import ReactPlayer from 'react-player';

class MeetingPage extends Component {
	constructor(props) {
		const uri = "https://sdd-shutup.herokuapp.com"
  		const uri2 = "http://localhost:5000"
	    super(props);
	}
	componentDidMount(props) {
  		const { match: { params } } = this.props;
  		//using uri2
  		axios.get(`http://localhost:5000/projects/${params.id}`).then(response => {
                console.log("project found in settings: ",response.data.project)
                this.setState({project:response.data.project.name})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

	doShutUp() {
		/*
		if (ReactPlayer.canPlay('./smaple.mp3')) {
			console.log("exists");
		}
		
		return <ReactPlayer url='./smaple.mp3' playing={true} volume={0.800} />*/
 		/*return <Sound url={'./smaple.mp3'} 
 				playStatus={Sound.status.PLAYING} 
 				onLoading={this.handleSongLoading}
   				onPlaying={this.handleSongPlaying}
   				onFinishedPlaying={this.handleSongFinishedPlaying} />*/
   		return <h1>SHUT UP!!!!!!</h1>
	}

  	render() {
	    return (
	    	<div class="columns">
	    		<div class="column is-one-quarter">
	    			<Sidebar/>
	    		</div>
	    		<div class="column" margin-top="100px" margin-bottom="100px">
	    			<div class="shutup">
						<button type="button" onClick = {this.doShutUp} className="button-is-text">Shut Up!</button>	
					</div>
				</div>
				<div class="column" margin-top="100px" margin-bottom="100px">
					<TimerComponent/>	
			
	    		</div>
	    	</div>
	    )
  }
}

export default MeetingPage;
