import axios from 'axios';

export default class Project {
  
  constructor(data) {
    if(!data){
      this.collaborators = [];
      this.projectId="placeholderId"
    }else{
      this.collaborators = data.collaborators;//array of EMAILS (type:string)
      //^TODO change this to hold users, not emails, deal with corresponding react error
      this.projectId = data._id;
    }
  }


  /*adds on an email(type string, form: blah@blah.com) to the list of collaborators for a project
  verifies that the email is a real user, adds the given project to the users list of projects
  and adds the user email to the projects list of collaborators
  */
  onAddCollaborator (state, project){//state.email,collaborators
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/users/${state.email}`).then(response => {
        const user = response.data.user;

        ///////VVVVVVV ADDING PROJECT IN ADDED USERS LIST OF PROJECTS
        const newProjectArray = user.projects.slice();
        newProjectArray.push(project);
        axios.patch(`http://localhost:5000/users/${state.email}`,{projects:newProjectArray}).then(
          response => {
            console.log("user updated: ",response.data.user);
            
          })//TODO in future, check that project doesnt already exist in users projectList
          .catch( error =>{
              reject("user dne");
          })
        ///////^^^^ADDING PROJECT IN ADDED USERS LIST OF PROJECTS
        var newArray = state.collaborators.slice();    
        newArray.push(state.email);  
        this.update(newArray)
        resolve(newArray);
      }).catch( error =>{
          console.log(error);
          reject("user dne")
      })
    })
  }

  onRemoveCollaborator(removeMe, collaborators){
    return new Promise(resolve => {
      const newArray = collaborators.filter(
        (collaborator) => {
            return collaborator !== removeMe;
        });
      this.collaborators = newArray;
      resolve(newArray);
      this.update(newArray)
      })
  };

  update(newArray) {
    return new Promise(resolve => {
      axios.patch(`http://localhost:5000/projects/${this.projectId}`,{collaborators: newArray}).then(
        response => {
          resolve(response);
        })
        .catch(function (error) {
            console.log(error);
        })
      })
  }
}
