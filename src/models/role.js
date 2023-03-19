import Permission from "./permission";

export default class Role {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes.name;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
    this.permissions = data.relationships.permissions.map((item) =>
      Permission.create(item)
    );
  }
  update(data) {
    this.id = data.id;
    this.name = data.attributes.name;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
    this.permissions = data.relationships.permissions.map((item) =>
      Permission.create(item)
    );
  }

  static create(data) {
    return new Role(data);
  }
}
