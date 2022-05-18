export class User {
  name?: string;
  surname?: string;
  email?: string;
  imageURL?: string;
  location?: string;
  age?: number;
  roles?: Array<string>;
  languages?: Array<string>;
  groupsID?: Array<string>;

  constructor() {
    this.name = '';
    this.surname = '';
    this.roles = ['student'];
    this.languages = [];
    this.groupsID = [];
  }
}
