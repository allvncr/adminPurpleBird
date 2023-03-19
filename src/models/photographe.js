import Specialite from "./specialite";
import User from "./user";

export default class Photographe {
  constructor(data) {
    this.id = data.attributes.id;
    if (data.relationships.user)
      this.user = User.create(data.relationships.user);
    this.bio = data.attributes.bio;
    this.experience = data.attributes.experience;
    this.facebook_url = data.attributes.facebook_url;
    this.google_url = data.attributes.google_url;
    this.linkedin_url = data.attributes.linkedin_url;
    this.resume = data.attributes.resume;
    this.video = data.attributes.video;
    if (data.relationships.specialities)
      this.specialities = data.relationships.specialities.map((item) =>
        Specialite.create(item)
      );
  }

  update(data) {
    this.id = data.attributes.id;
    this.user = User.create(data.relationships.user);
    this.bio = data.attributes.bio;
    this.experience = data.attributes.experience;
    this.facebook_url = data.attributes.facebook_url;
    this.google_url = data.attributes.google_url;
    this.linkedin_url = data.attributes.linkedin_url;
    this.resume = data.attributes.resume;
    this.video = data.attributes.video;
    if (data.relationships.specialities)
      this.specialities = data.relationships.specialities.map((item) =>
        Specialite.create(item)
      );
  }

  static create(data) {
    return new Photographe(data);
  }
}
