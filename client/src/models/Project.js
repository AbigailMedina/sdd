import axios from 'axios';
import User from './User';
import Notes from './Notes';

// class containing model for a project     NEED TO FINISH
export default class Project {
  constructor(data) {
    if(!data){
      this.collaborators = [];
      this.notes = [];
      this._id="placeholderId"
      this.name="placeholderName"
    }else{
      this.collaborators = data.collaborators;//array of EMAILS (type:string)
      //^TODO change this to hold users, not emails, deal with corresponding react error
      this.notes = data.notes;
      this._id = data._id;
      this.name = data.name;
    }
  }


  /*adds on an email(type string, form: blah@blah.com) to the list of collaborators for a project
  verifies that the email is a real user, adds the given project to the users list of projects
  and adds the user email to the projects list of collaborators
  */
  onAddCollaborator (state, project){//state.email,collaborators
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/users/${state.email}`).then(response => {
        const user = new User(response.data.user)
        // console.log("user fetched in onAddCollaborator::",user)//TODO bug this prints Project type????
        
        const newProjectArray = user.projects.slice();
        var newCollaboratorArray = state.collaborators.slice();   

        // console.log("newProjectArray::",newProjectArray)
        // console.log("newCollaboratorArray::",newCollaboratorArray)

        if(newProjectArray.indexOf(project)!==-1){
            reject("user already has this project");
            return;
        }else if (newCollaboratorArray.indexOf(user.email)!==-1){
            reject("project already has this user");
            return;
        }else{ 
          newProjectArray.push(project);console.log("newProjectArray2::",newProjectArray)
          newCollaboratorArray.push(state.email);console.log("newCollaboratorArray2::",newCollaboratorArray)  
          user.update(newProjectArray);//<- add project to collaborator
          this.update(newCollaboratorArray)//<- add collaborator to project

          resolve(newCollaboratorArray);
        }
      }).catch( error =>{reject("user get error onAddCollaborator")})
    })
  }
/*takes in current list of collaborators in fe and an email to remove*/
  onRemoveCollaborator(removeMe, collaborators){
    return new Promise((resolve,reject) => {

      axios.get(`http://localhost:5000/users/${removeMe}`).then(response => {
        const user = new User(response.data.user)
        // console.log("user fetched in onRemoveCollaborator::",user)//TODO bug this prints Project type????

        var newCollaboratorArray = collaborators.filter((c)=>{return c!==removeMe});    
        var newProjectArray = user.projects.filter( (p)=>{return p._id!==this._id})
        
        // console.log("newProjectArray2::",newProjectArray)

        user.update(newProjectArray);
        this.update(newCollaboratorArray)
        resolve(newCollaboratorArray);
        }).catch( error =>{
            console.log(error);
            reject(error)
        })
    
      })
  };

  update(newCollaboratorArray) {
    return new Promise((resolve,reject) => {
      axios.patch(`http://localhost:5000/projects/${this._id}`,{collaborators: newCollaboratorArray}).then(
        response => {
          this.collaborators = newCollaboratorArray
          // console.log("project updated: ",response.data.project);
          resolve(response);
        })
        .catch(function (error) {
          reject("patch error on update project")
        })
      })
  }

  updateNotes(input) {
    return new Promise((resolve,reject) => {
      axios.get(`http://localhost:5000/projects/${this._id}`).then(response => {
      var found=false
      this.notes=response.data.project.notes
      console.log(input.date)
      //const newDate=new Date(input.date)
      //console.log("new date object:", newDate)
      for (var i=0; i<this.notes.length; i++) {
        console.log("in the array: ", this.notes[i].date)
        //const oldDate=new Date(this.notes[i].date)
        //console.log(oldDate)
        if (this.notes[i].date==input.date) {
              console.log("same day")
              found=true
              var updatedText=this.notes[i].text+"\n"
              updatedText=updatedText+input.text
              const data={date:this.notes[i].date, text:updatedText}
              const newNote=new Notes(data)
              this.notes.splice(i, 1, newNote)
              axios.patch(`http://localhost:5000/projects/${this._id}`,{notes: this.notes}).then(
              response => {
              this.notes=response.data.project.notes
                resolve(response);
              })
              .catch(function (error) {
                reject("patch error on update project")
              })
              break
            }
          
        
      }

      if (!found) {
        console.log("got in here")
        const newNote=new Notes(input)
        this.notes.push(newNote)
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
        console.log(error);
      })
    })
  }
}
