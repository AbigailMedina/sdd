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
      this.projects = data.projects
      // console.log("user constructor, data:",data);

    }
  }

  onRemoveProject() {

  }

  update(newProjectArray) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{projects:newProjectArray}).then(
        response => {
          this.projects = response.data.user.projects
          // console.log("user updated: ",response.data.user);
          resolve(response);
        })
        .catch( error =>{
          reject("patch error on update user");
        })      
      })
  }

}
