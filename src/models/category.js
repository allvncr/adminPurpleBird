export default class Category {
  constructor(data) {
    this.id = data.attributes.id;
    this.name = data.attributes.name;
  }
  update(data) {
    this.id = data.attributes.id;
    this.name = data.attributes.name;
  }

  static create(data) {
    return new Category(data);
  }
}
