export default class Tag {
  constructor(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
  }
  update(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
  }

  static create(data) {
    return new Tag(data);
  }
}
