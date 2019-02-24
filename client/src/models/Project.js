// import { observable } from 'mobx';
// import { Page, PageData, PageElementData, User } from './';


export default class Project {
  // public id;//: int;
  // // @observable
  // public name;//: string;
  // public user;//: User;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
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

