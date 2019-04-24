import axios from 'axios';
import Project from './Project';

// class containing model for a user
export default class User {
  constructor(data) {
    if(!data){
      this.name = "defaultUser"
      this.userId = "defaultUser"
      this.email = "defaultUser"
      this.projects = []            // array of projects the user is a member of
    }else{
      this.name = data.name
      this.userId = data.userId
      this.email = data.email
      this.projects = data.projects

    }
  }

  // function to remove the user from a project
  onRemoveProject(removeMe) {
    return new Promise((resolve,reject) => {
      axios.get(`http://localhost:5000/projects/${removeMe._id}`).then(response => {
        const project = new Project(response.data.project)

        var newCollaboratorArray = project.collaborators.filter((c)=>{return c!==this.email});    
        var newProjectArray = this.projects.filter( (p)=>{return p._id!==removeMe._id})

        project.update(newCollaboratorArray);       // Update project's list of users
        this.update(newProjectArray)                // Update user's list of projects
        resolve(newProjectArray);
      }).catch( error =>{
        reject(error)
      })
    })
  }

  // function to update user's email
  onChangeEmail(newEmail) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{email:newEmail}).then(
        response => {
          this.email = response.data.user.email
          resolve(response.data.user.email);
        })
      .catch( () =>{
        reject("patch error on update user email");
      })      
    })
  }

  // function to update user's password
  onChangePassword(newPass) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{password:newPass}).then(
        response => {
          resolve(response);
        })
      .catch( () =>{
        reject("patch error on update user password");
      })      
    })    
  }

  // function to update a user's list of projects
  update(newProjectArray) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/users/${this.email}`,{projects:newProjectArray}).then(
        response => {
          this.projects = response.data.user.projects
          resolve(response);
        })
      .catch( () =>{
        reject("patch error on update user projects");
      })      
    })
  }
}
