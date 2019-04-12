
// class containing information related to one instance of notes
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

    // function to update text for a specific note
  	update(data) {
  		this.text=data.text	
  	}
}
