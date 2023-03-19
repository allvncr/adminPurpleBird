export default class Specialite {
  constructor(data) {
    this.id = data.id;
    this.title = data.attributes.title;
    this.created_at = data.attributes.created_at;
  }
  update(data) {
    this.id = data.id;
    this.title = data.attributes.title;
    this.created_at = data.attributes.created_at;
  }

  static create(data) {
    return new Specialite(data);
  }
}
