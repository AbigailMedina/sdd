import TimeInput from 'react-time-input'
import React, { Component } from 'react'

const ms = require('pretty-ms')
class Timer2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      endTime: 3,
      remaining: 3
    }
    this.onTimeChangeHandler = this.onTimeChangeHandler.bind(this);
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    
  }


  onTimeChangeHandler (val) {
  	this.setState({endTime:parseInt(val)})
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    
    
    return(
      <div class="center" style={{marginTop: '100px'}}>
      <h4> Enter an ending time</h4>
      <TimeInput initTime={this.state.endTime} 
				   ref="TimeInputWrapper"
				   className='form-control'
				   mountFocus='true'
				   onTimeChange={this.onTimeChangeHandler} />
		{(this.state.time>=this.state.endTime) ?
        <h4> {ms(this.state.time)}</h4> :
        <h4>finished</h4>}
		{start}
        {resume}
        {stop}
        {reset}
        
      </div>
    )
  }
}
export default Timer2;