export default class Equipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.job = data.job;
    this.email = data.email;
    this.photo = data.photo;
  }
  update(data) {
    this.id = data.id;
    this.name = data.name;
    this.job = data.job;
    this.email = data.email;
    this.photo = data.photo;
  }

  static create(data) {
    return new Equipe(data);
  }
}
