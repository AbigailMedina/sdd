import React, { Component } from 'react'
import Button from '../models/button';

// class containing information regarding the Shut Up button
class ButtonComponent extends Component {
  constructor(props) {
    super(props);
  	this.state={level:"50"}    // initial aggression button is set to 50
    this.addInput=this.addInput.bind(this)
  }

  componentDidMount(props) {
    this.button = new Button();
  }
  
  // function to update aggression level based on user input
  addInput(e) {
    this.setState({level:e.target.value})

  }

  // function to sound "Shut Up" based on current aggression level
  doShutUp() {
    this.button.updateLevel(this.state.level)
    const button = document.querySelector('button')
    button.addEventListener('click', this.button.playSound())
  }

  render() {
    return (
      <div class="center" style={{maxWidth:"400px"}}>
        <h4>Slide agression bar to determine intensity of "Shut Up!" message</h4>
        <div>
          <input id="sliderWithValue" class="slider has-output is-fullwidth" min="0" max="100" onChange={this.addInput} value={this.state.level} step="25" type="range"/>
          <output for="sliderWithValue"> {this.state.level}</output><br/>
          <button type="button" onClick = {this.doShutUp.bind(this)} className="button is-white">
            <img src={require("../photos/button.png")} alt="button" width="100" height="100"/>
          </button>
        </div>
      </div>
    );
  }
}

export default ButtonComponent;