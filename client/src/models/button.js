// class containing model for "Shut Up" button
export default class Button {
  constructor() {
    this.level=50; 
  }

  // function to play "Shut Up" sound based on set aggression level
  playSound() {
    const sound = new Audio()
    if (this.level===0) {
      sound.src = 'level1.mp3'
    } else if (this.level===25) {
      sound.src = 'level2.mp3'
    } else if (this.level===50) {
      sound.src = 'level3.mp3'
    } else if (this.level===75) {
      sound.src = 'level4.mp3'
    } else if (this.level===100) {
      sound.src = 'level5.mp3'
    }
    sound.play()
  }

  // function to change level based on user input
  updateLevel(value) {
    this.level=value;
  }
}

