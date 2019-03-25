import React, { Component } from 'react'
import Timer from "react-compound-timer";
import TimeInput from 'react-time-input'


class TimerComponent extends Component {
	constructor(props) {
    	super(props);
    	this.state={time:"05:00", go:false}
    	this.addInput=this.addInput.bind(this)
    	this.changeState=this.changeState.bind(this)
  	}

  	addInput(e) {
  		this.setState({time:e.target.value, go:false})
  	}

  	changeState() {
  		this.setState({go:true})
  	}

  	convertTime() {
  		const splitTime=this.state.time.split(":", 5)
  		const minutes=parseInt(splitTime[0])
  		const seconds=parseInt(splitTime[1])
  		return 1000*(minutes*60+seconds)
  	}

  	render() {
	    return (
			<div class="center" style={{marginTop:"-50px", maxWidth:"300px"}}>
				<h4>Enter a time in the format '00:00' to use timer</h4>
				<form className="field is-grouped">
					<input class="input" type="text" onChange={this.addInput} placeholder="Pick a time" value={this.state.time} />
					<button className="button is-success" onClick={this.changeState}>Enter</button>
				</form>
				{this.state.go ?
					<Timer initialTime={this.convertTime()} direction="backward" startImmediately={false} >
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