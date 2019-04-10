import React, { Component } from 'react'
import Timer from "react-compound-timer";
import OurTimer from '../models/timer';


class TimerComponent extends Component {
	constructor(props) {
    	super(props);
    	this.timer = new OurTimer();
    	this.state={go:false}
    	this.addInput=this.addInput.bind(this)
    	this.changeState=this.changeState.bind(this)
  	}

  	addInput(e) {
  		this.setState({go:false})
  		this.timer.updateTime(e.target.value)
  	}

  	changeState() {
  		this.setState({go:true})
  	}

  	render() {
	    return (
			<div class="center" style={{maxWidth:"300px"}}>
				<h4>Enter a time in the format '00:00' to use timer</h4>
				<form className="field is-grouped">
					<input class="input" type="text" onChange={this.addInput} placeholder="Pick a time" value={this.timer.time} />
					<button className="button is-success" onClick={this.changeState}>Enter</button>
				</form>
				{this.state.go ?
					<Timer initialTime={this.timer.convertTime()} direction="backward" startImmediately={false} >
    					{({ start, resume, pause, stop, reset, timerState }) => (
        					<React.Fragment>
				    	    	<div class="box">
				                	<h4><Timer.Minutes /> minutes <Timer.Seconds /> seconds</h4>
				            		<br/>
				            		<div class="center">
				                		<button class="button is-normal is-primary" onClick={start}>Start</button>
				                		<button class="button is-normal is-danger" onClick={stop}>Stop</button>
				                		<button class="button is-normal is-info" onClick={reset}>Reset</button>
				            		</div>
				         		</div>
				        	</React.Fragment>
    					)}
					</Timer>
				: <div></div> }
			</div>
		)
	}
}
export default TimerComponent;