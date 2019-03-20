import React, { Component } from 'react'
import Timer from "react-compound-timer";
import TimeInput from 'react-time-input'


class TimerComponent extends Component {
	constructor(props) {
    	super(props);
    	this.state={time:'05:00'}
    	this.onTimeChangeHandler = this.onTimeChangeHandler.bind(this);
  	}


  	onTimeChangeHandler (val) {
  		this.setState({time:val})
  		console.log(this.state.time)
  	}

  	convertTime (time) {
  		console.log(time)
  		const splitTime=time.split(":", 5)
  		const minutes=parseInt(splitTime[0])
  		const seconds=parseInt(splitTime[1])
  		console.log(minutes*60)
  		console.log(seconds)
  		console.log((1000*(minutes*60)+seconds))
  		return 1000*(minutes*60)+seconds
  	}

  	render() {
	    return (
			<div style={{marginTop: '100px'}}>
				<TimeInput initTime={this.state.time} 
				   ref="TimeInputWrapper"
				   className='form-control'
				   mountFocus='true'
				   onTimeChange={this.onTimeChangeHandler} />
				<Timer initialTime={this.convertTime(this.state.time)} direction="backward" startImmediately={false}>
    				{({ start, resume, pause, reset}) => (
        				<React.Fragment>
				            <div class="center">
				                <h1><Timer.Minutes /> minutes <Timer.Seconds /> seconds</h1>
				   
				            </div>
				            <br />
				            <div class="center">
				                <button onClick={start}>Start</button>
				                <button onClick={pause}>Pause</button>
				                <button onClick={resume}>Resume</button>
				                <button onClick={reset}>Reset</button>
				            </div>
				        </React.Fragment>
    				)}
				</Timer>
			</div>
		)
	}
}
export default TimerComponent;