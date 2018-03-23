export default class Bird {
  static GENES = ['poor', 'average', 'good', 'great', 'wonderful', 'perfect'];

  constructor(name, sex, genes, stats) {
    this.name = name;
    this.sex = sex;
    this.genes = genes;
    this.stats = stats;
  }
}
