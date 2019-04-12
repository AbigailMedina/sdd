
export default class Button {

  constructor() {
    this.time="05:00"; 
  }

  convertTime() {
      const splitTime=this.time.split(":", 5)
      const minutes=parseInt(splitTime[0])
      const seconds=parseInt(splitTime[1])
      return 1000*(minutes*60+seconds)
  }

  updateTime(value) {
    this.time=value;
  }
}

