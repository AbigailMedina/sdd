import React, { Component } from 'react'
import Timer from "react-compound-timer";
import OurTimer from '../models/timer';

// class displaying timer component based on user input and Timer model
class TimerComponent extends Component {
	constructor(props) {
    	super(props);
    	this.timer = new OurTimer();
    	this.state={go:false}
    	this.addInput=this.addInput.bind(this)
    	this.changeState=this.changeState.bind(this)
  	}

  	// function to update time in Timer model based on user input
  	addInput(e) {
  		this.setState({go:false})
  		this.timer.updateTime(e.target.value)
  	}

  	// function to change state and display timer
  	changeState() {
  		this.setState({go:true})
  	}

  	render() {
	    return (
			<div className="center" style={{maxWidth:"300px"}}>
				<h4>Enter a time in the format '00:00' to use timer</h4>
				<form className="field is-grouped">
					<input className="input" type="text" onChange={this.addInput} placeholder="Pick a time" value={this.timer.time} />
					<button className="button is-success" onClick={this.changeState}>Enter</button>
				</form>
				{this.state.go ?
					<Timer initialTime={this.timer.convertTime()} direction="backward" startImmediately={false} >
    					{({ start, stop, reset}) => (
        					<React.Fragment>
				    	    	<div className="box">
				                	<h4><Timer.Minutes /> minutes <Timer.Seconds /> seconds</h4>
				            		<br/>
				            		<div className="center">
				                		<button className="button is-normal is-primary" onClick={start}>Start</button>
				                		<button className="button is-normal is-danger" onClick={stop}>Stop</button>
				                		<button className="button is-normal is-info" onClick={reset}>Reset</button>
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