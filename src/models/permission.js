export default class Permission {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes.name;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
  }
  update(data) {
    this.id = data.id;
    this.name = data.attributes.name;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
  }

  static create(data) {
    return new Permission(data);
  }
}
