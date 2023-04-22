export default class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.roles = data.roles;
  }

  update(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.roles = data.roles;
  }

  static create(data) {
    return new User(data);
  }
}
