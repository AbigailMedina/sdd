
// class containing the model for a timer
export default class Button {
  constructor() {
    this.time="05:00"; 
  }

  // function to convert user input into miliseconds to give to timer
  convertTime() {
      const splitTime=this.time.split(":", 5)
      const minutes=parseInt(splitTime[0], 10)
      const seconds=parseInt(splitTime[1], 10)
      return 1000*(minutes*60+seconds)
  }

  // function to update time value based on user input
  updateTime(value) {
    this.time=value;
  }
}

