import User from "./user";
import Category from "./category";

export default class Article {
  constructor(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
    this.slug = data.attributes.slug;
    this.meta_title = data.attributes.meta_title;
    this.meta_description = data.attributes.meta_description;
    this.categories = data.relationships.categories.map((item) =>
      Category.create(item)
    );
    this.author = User.create(data.relationships.user);
    this.description = data.attributes.description;
    this.content = data.attributes.content;
    this.image = data.attributes.image;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
    this.visible = data.attributes.visible ? true : false;
  }

  update(data) {
    this.id = data.attributes.id;
    this.title = data.attributes.title;
    this.slug = data.attributes.slug;
    this.meta_title = data.attributes.meta_title;
    this.meta_description = data.attributes.meta_description;
    this.categories = data.relationships.categories.map((item) =>
      Category.create(item)
    );
    this.author = User.create(data.relationships.user);
    this.description = data.attributes.description;
    this.content = data.attributes.content;
    this.image = data.attributes.image;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
    this.visible = +data.attributes.visible == 1 ? true : false;
  }

  static create(data) {
    return new Article(data);
  }
}
