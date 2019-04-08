import axios from 'axios';

export default class Project {
  
  constructor(data) {
    if(!data){
      this.name = "defaultUser"
      this.userId = "defaultUser"
      this.email = "defaultUser"
      this.projects = []
    }else{
      this.name = data.name
      this.userId = data.userId
      this.email = data.email
    }
  }

  onRemoveProject() {

  }

  update(newArray) { 
    return new Promise(resolve => {
      axios.patch(`http://localhost:5000/users/${this.userId}`,{projects: newArray}).then(
        response => {
          resolve(response);
        })
        .catch(function (error) {
            console.log(error);
        })   
    })
  }

  
}
