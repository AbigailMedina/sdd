import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import './style.css'

class TimerInput extends React.Component {
render() {
  return (
   <div style={{marginLeft:100}}>
      <h3>Input your desired time</h3>
      <input type="number" minutes={this.props.minutes} required />
  </div>
     );
   }
}

class Timer extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      value: '',
      isClicked : false
    }
    this.secondsRemaining;
    this.intervalHandle;
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);

    this.setState({
      value: min,
      seconds: sec,
    })

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })

    }

    if (min < 10) {
      this.setState({
        value: "0" + min,
      })

    }

    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }


    this.secondsRemaining--
  }

  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isClicked : true
    })
  }
  render() {
 	return (
    	<div class="content">
        	<h1 style={{ fontSize: 100, marginLeft:100 }}>{this.props.value}:{this.props.seconds}</h1>
      		const clicked = this.state.isClicked;
    		if(clicked){
   
      			<div>
      				<div value={this.state.value} seconds={this.state.seconds} />
         		</div>
        	}else{
				<div>
					<TimerInput value={this.state.value} handleChange={this.handleChange} />
              		<div value={this.state.value} seconds={this.state.seconds} />
              		<StartButton startCountDown={this.startCountDown} value={this.state.value} />
        		</div>
    		}
    	</div>
    );
  }
}

class StartButton extends React.Component {
  render() {
    return (
  		<div style={{ marginLeft: 130 }}>
  			<button onClick={this.props.startCountDown}>Start</button>
 		</div>
	);
  }
} 

export default Timer;
