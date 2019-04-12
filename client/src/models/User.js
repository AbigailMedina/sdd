import axios from 'axios';
import Project from './Project';

export default class User {
  
  constructor(data) {
    if(!data){
      this.name = "defaultUser"
      this.userId = "defaultUser"
      this.email = "defaultUser"
      this.projects = []
      this.secretary=false
    }else{
      this.name = data.name
      this.userId = data.userId
      this.email = data.email
      this.projects = data.projects

      this.secretary=data.secretary

    }
  }

  onRemoveProject(removeMe) {
    return new Promise((resolve,reject) => {

      axios.get(`http://localhost:5000/projects/${removeMe._id}`).then(response => {
        const project = new Project(response.data.project)
        // console.log("user fetched in onRemoveCollaborator::",user)//TODO bug this prints Project type????

        var newCollaboratorArray = project.collaborators.filter((c)=>{return c!==this.email});    
        var newProjectArray = this.projects.filter( (p)=>{return p._id!==removeMe._id})
        
        // console.log("newProjectArray2::",newProjectArray)

        project.update(newCollaboratorArray);
        this.update(newProjectArray)
        resolve(newProjectArray);
        }).catch( error =>{
            console.log(error);
            reject(error)
        })
    
      })
  }

  onChangeEmail(newEmail) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{email:newEmail}).then(
        response => {
          this.email = response.data.user.email
          resolve(response.data.user.email);
        })
        .catch( error =>{
          reject("patch error on update user email");
        })      
      })
  }

  onChangePassword(newPass) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{password:newPass}).then(
        response => {
          resolve(response);
        })
        .catch( error =>{
          reject("patch error on update user password");
        })      
      })    
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
          reject("patch error on update user projects");
        })      
      })
  }

}
