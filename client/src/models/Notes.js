import axios from 'axios';

export default class Notes {
  
  	constructor(data) {
    	if(!data){
      	this.date = "00/00/0000"
      	this.text=""
    	}else{
      	this.text=data.text
      	this.date=data.date
    	}
  	}

  	update(data) {
  		this.text=data.text	
  	}
}
