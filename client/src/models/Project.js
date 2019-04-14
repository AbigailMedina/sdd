import axios from 'axios';
import User from './User';
import Notes from './Notes';

// class containing model for a project
export default class Project {
  constructor(data) {
    if(!data){
      this.collaborators = [];
      this.notes = [];
      this._id="placeholderId"
      this.name="placeholderName"
    }else{
      this.collaborators = data.collaborators;    //array of EMAILS (type:string)
      //^TODO change this to hold users, not emails, deal with corresponding react error
      this.notes = data.notes;
      this._id = data._id;
      this.name = data.name;
    }
  }

  // function to add collaborater with given input of email and list of projects user adds
  onAddCollaborator (state, project){           // state contains email,collaborators
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/users/get/${state.email}`).then(response => {
        const user = new User(response.data.user)
        const newProjectArray = user.projects.slice();
        var newCollaboratorArray = state.collaborators.slice();
        if(newProjectArray.indexOf(project)!==-1){
            reject("user already has this project");
            return;
        }else if (newCollaboratorArray.indexOf(user.email)!==-1){
            reject("project already has this user");
            return;
        }else{ 
          newProjectArray.push(project);
          newCollaboratorArray.push(state.email); 
          user.update(newProjectArray);         // add project to collaborator
          this.update(newCollaboratorArray)     // add collaborator to project
          resolve(newCollaboratorArray);
        }
      }).catch( error =>{reject("user get error onAddCollaborator")})
    })
  }

// function takes in current list of collaborators in frontend and an email to remove
  onRemoveCollaborator(removeMe, collaborators){
    return new Promise((resolve,reject) => {
      axios.get(`http://localhost:5000/users/get/${removeMe}`).then(response => {
        const user = new User(response.data.user)
        var newCollaboratorArray = collaborators.filter((c)=>{return c!==removeMe});    
        var newProjectArray = user.projects.filter( (p)=>{return p._id!==this._id})
        user.update(newProjectArray);
        this.update(newCollaboratorArray)
        resolve(newCollaboratorArray);
      })
      .catch( error =>{
          reject(error)
      })
    })
  };

  // function to update name of project
  onChangeName(newName) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/projects/${this._id}`,{name: newName}).then(
        response => {
          this.name = response.data.project.name
          resolve(response.data.project.name);
        })
        .catch(function (error) {
          reject(error);
        })      
      })    
  }

  // function to update a specific project's list of collaborators
  update(newCollaboratorArray) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/projects/${this._id}`,{collaborators: newCollaboratorArray}).then(
        response => {
          this.collaborators = newCollaboratorArray
          resolve(response);
        })
      .catch(function (error) {
        reject("patch error on update project")
      })
    })
  }

  // function to update array holding notes for a specific project model
  updateNotes(input) {
    return new Promise((resolve,reject) => {
      axios.get(`http://localhost:5000/projects/${this._id}`).then(response => {
        var found=false                 // variable to hold whether current date already exists
        this.notes=response.data.project.notes
        for (var i=0; i<this.notes.length; i++) {
          if (this.notes[i].date===input.date) {   // current date was found in notes array
            found=true
            var updatedText=this.notes[i].text+"\n"
            updatedText=updatedText+input.text
            const data={date:this.notes[i].date, text:updatedText}
            const newNote=new Notes(data)       // update existing note with new text input
            this.notes.splice(i, 1, newNote)
            axios.patch(`http://localhost:5000/projects/${this._id}`,{notes: this.notes}).then(
              response => {
                this.notes=response.data.project.notes      // currently referencing local host for database
                resolve(response);
              })
            .catch(function (error) {
              reject("patch error on update project")
            })
            break
          } 
        }
        if (!found) {       // current date wasn't found in notes array
          const newNote=new Notes(input)
          this.notes.push(newNote)      // add new note to notes array
          axios.patch(`http://localhost:5000/projects/${this._id}`,{notes: this.notes}).then(
            response => {
              this.notes=response.data.project.notes
              resolve(response);
            })
          .catch(function (error) {
            reject("patch error on update project")
          })
        }
      })
      .catch(function (error) {
        reject(error);
      })
    })
  }
}
