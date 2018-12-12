export default class Breed {
  constructor(id, opt) {
    this.id = id;
    this.name = opt.name;
    this.recipe = opt.recipe;
    this.cssFilter = opt.filter;
  }
}
