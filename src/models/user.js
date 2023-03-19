import Role from "./role";

export default class User {
  constructor(data) {
    this.id = data.id;
    this.avatar = data.attributes.avatar;
    this.name = data.attributes.name;
    this.email = data.attributes.email;
    this.phone = data.attributes.phone;
    this.registered_at = data.attributes.registered_at;
    this.updated_at = data.attributes.updated_at;
    this.created_at = data.attributes.created_at;
    this.address = data.attributes.address;
    this.role = data.relationships.role;
  }

  update(data) {
    this.id = data.id;
    this.avatar = data.attributes.avatar;
    this.name = data.attributes.name;
    this.email = data.attributes.email;
    this.phone = data.attributes.phone;
    this.registered_at = data.attributes.registered_at;
    this.updated_at = data.attributes.updated_at;
    this.created_at = data.attributes.created_at;
    this.address = data.attributes.address;
    this.role = data.relationships.role;
  }

  static create(data) {
    return new User(data);
  }
}
