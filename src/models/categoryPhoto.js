export default class CategoryPhoto {
  constructor(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
  }
  update(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
  }

  static create(data) {
    return new CategoryPhoto(data);
  }
}
