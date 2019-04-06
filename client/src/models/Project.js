import axios from 'axios';

export default class Project {
  
  constructor(data) {
    console.log("constructor data: ",data)
    if(!data){
      this.name = "";
      this.collaborators = [];
      this.projectId="placeholderId"
    }else{
      this.name = data.name;
      this.collaborators = data.collaborators;
      this.projectId = data._id;
    }
  }

  onAddCollaborator (state){//state.email,project,collaborators
    //verify that email == a real user
    axios.get(`http://localhost:5000/users/${state.email}`).then(response => {
      const user = response.data.user;
      console.log("user found in createProject: ",user);

      ///////VVVVVVV ADDING PROJECT IN ADDED USERS LIST OF PROJECTS
      const newProjectArray = user.projects.slice();
      newProjectArray.push(state.project);
      axios.patch(`http://localhost:5000/users/${state.email}`,{projects:newProjectArray}).then(
        response => {
          console.log("user updated: ",response.data.user);
        })//TODO in future, check that project doesnt already exist in users projectList
        .catch( error =>{
            console.log(error);
        })
      ///////^^^^ADDING PROJECT IN ADDED USERS LIST OF PROJECTS
      var newArray = state.collaborators.slice();    
      newArray.push(state.email);  
      return new Promise(resolve => {
          resolve(newArray);
      })
      //^TODO change this to hold users, not emails, deal with corresponding react error
    }).catch( error =>{
        console.log(error);
    })
  }

  onRemoveCollaborator(removeMe){
    const list = this.collaborators.filter(
      function (collaborator) {
          return collaborator !== removeMe;
      });
    this.collaborators = list;
    return new Promise(resolve => {
          resolve(list);
      })
  };

//updates collaborators list
  update(newArray) {
    axios.patch(`http://localhost:5000/projects/${this.projectId}`,{collaborators:newArray}).then(
      response => {
        console.log("updated project: ",response.data.project,"response: ",response);   
        return new Promise(resolve => {
          resolve(response);
        })
      })
      .catch(function (error) {
          console.log(error);
      })
  }
}
