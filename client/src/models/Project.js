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
        if (newProjectArray.find((p)=>{p.name==project.name})){
          reject("user already has this project");
          return;
        }
        newProjectArray.push(project);
        axios.patch(`http://localhost:5000/users/${state.email}`,{projects:newProjectArray}).then(
          response => {
            console.log("user updated: ",response.data.user);
            
          })
          .catch( error =>{
              reject(error);
          })
        ///////^^^^ADDING PROJECT IN ADDED USERS LIST OF PROJECTS
        var newArray = state.collaborators.slice();    
        newArray.push(state.email);  
        this.update(newArray)
        resolve(newArray);
      }).catch( error =>{
          console.log(error);
          reject(error)
      })
    })
  }
/*takes in current list of collaborators in fe and an email to remove*/
  onRemoveCollaborator(removeMe, collaborators){
    return new Promise((resolve,reject) => {

      axios.get(`http://localhost:5000/users/${removeMe}`).then(response => {
        const user = response.data.user;

        ///////VVVVVVV removing PROJECT IN ADDED USERS LIST OF PROJECTS
        const newProjectArray = user.projects.slice();
        
        newProjectArray.filter((p)=>{
          console.log("p",p, this.projectId)
          return p._id!=this.projectId
        })

        axios.patch(`http://localhost:5000/users/${removeMe}`,{projects:newProjectArray}).then(
          response => {
            console.log("user updated: ",response.data.user);
            
          })
          .catch( error =>{
              reject(error);
          })
        ///////^^^^removing PROJECT IN ADDED USERS LIST OF PROJECTS
        ///////vvvvremoving user from project list of collaborators
        var newArray = collaborators.filter((c)=>{
          return c!=removeMe
        });    
        this.update(newArray)
        resolve(newArray);
        }).catch( error =>{
            console.log(error);
            reject(error)
        })
    
      })
  };

  update(newArray) {
    return new Promise(resolve => {
      axios.patch(`http://localhost:5000/projects/${this.projectId}`,{collaborators: newArray}).then(
        response => {
          this.collaborators = newArray
          resolve(response);
        })
        .catch(function (error) {
            console.log(error);
        })
      })
  }
}
