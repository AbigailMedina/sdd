import React, { Component } from 'react'
import Button from '../models/button';

class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    const button=null;
  	this.state={level:"50"}
    this.addInput=this.addInput.bind(this)
	  
  }

  componentDidMount(props) {
    this.button = new Button();
  }
  
  addInput(e) {
    this.setState({level:e.target.value})

  }

  doShutUp() {
    this.button.updateLevel(this.state.level)
    const button = document.querySelector('button')
    button.addEventListener('click', this.button.playSound())
  }

  render() {
    return (
      <div class="center">
      <h4>Enter a time in the format '00:00' to use timer</h4>
      <input id="sliderWithValue" class="slider has-output is-fullwidth" min="0" max="100" onChange={this.addInput} value={this.state.level} step="25" type="range"/>
        <output for="sliderWithValue">{this.state.level}</output><br/>
        <button type="button" onClick = {this.doShutUp.bind(this)} className="button is-white">
          <img src={require("../photos/button.png")} width="100" height="100"/>
        </button>
      </div>
    );
  }
}
export default ButtonComponent;
