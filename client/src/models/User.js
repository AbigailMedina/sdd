import axios from 'axios';

export default class Project {
  
  constructor(data) {
    if(!data){
      name = "defaultUser"
      userId = "defaultUser"
      email = "defaultUser"
      projects = []
    }else{
      name = data.name
      userId = data.userId
      email = data.email
    }
  }

  
}
