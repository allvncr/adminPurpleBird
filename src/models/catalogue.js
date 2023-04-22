export default class Catalogue {
  constructor(data) {
    this.id = data.id;
    this.category = data.category;
    this.url = data.url;
  }
  update(data) {
    this.id = data.id;
    this.category = data.category;
    this.url = data.url;
  }

  static create(data) {
    return new Catalogue(data);
  }
}
