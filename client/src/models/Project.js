// import { observable } from 'mobx';
// import { Page, PageData, PageElementData, User } from './';


export default class Project {
  // public id;//: int;
  // // @observable
  // public name;//: string;
  // public user;//: User;

  constructor(data) {
    this.name = data.title;
    // this.userId = data.userId;
    this.collaborators = data.collaborators;
  }

  get user() {
    return this.user;
  }

  updateTitle(data) {
    if (data.name) {
      this.title = data.title;
    }
  }
}

