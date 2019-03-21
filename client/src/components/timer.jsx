import React, { Component } from 'react'
import Timer from 'react-compound-timer'
import TimeInput from 'react-time-input'

class TimerComponent extends Component {
	constructor(props) {
    	super(props);
    	this.state={time:'05:00'}
    	this.onTimeChangeHandler = this.onTimeChangeHandler.bind(this);
  	}


  	onTimeChangeHandler(val) {
  		this.setState({time:val})
  	}

  	convertTime() {
  		
  		const splitTime=this.state.time.split(":", 5)
  		const minutes=parseInt(splitTime[0])
  		const seconds=parseInt(splitTime[1])
  		console.log(splitTime[0])
  		console.log(splitTime)
  		console.log((1000*(minutes*60)+seconds))
  		return (1000*(minutes*60)+seconds)
  	}


	/*<TimeInput initTime={this.state.time}
				   ref="TimeInputWrapper"
				   className='form-control'
				   mountFocus='true'
				   onTimeChange={this.onTimeChangeHandler} /> */

  	render() {
	    return (
			<div class="center" style={{marginTop: '100px'}}>
				<Timer initialTime={this.convertTime()} direction="backward" startImmediately={false} >
    				{({ start, resume, pause, stop, reset, timerState }) => (
        				<React.Fragment>
				            <div class="$box-color: red">
				                <h4><Timer.Minutes /> minutes</h4>
				                <Timer.Seconds /> seconds
				            </div>
				
				            <br />
				            <div>
				                <button onClick={start}>Start</button>
				                <button onClick={pause}>Pause</button>
				                <button onClick={stop}>Stop</button>
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