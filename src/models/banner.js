export default class Banner {
  constructor(data) {
    this.id = data.id;
    this.link = data.link;
  }
  update(data) {
    this.id = data.id;
    this.link = data.link;
  }

  static create(data) {
    return new Banner(data);
  }
}
