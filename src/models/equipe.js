export default class Equipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.job = data.job;
    this.email = data.email;
  }
  update(data) {
    this.id = data.id;
    this.name = data.name;
    this.job = data.job;
    this.email = data.email;
  }

  static create(data) {
    return new Equipe(data);
  }
}
