export default class Bird {
  static GENES = ['poor', 'average', 'good', 'great', 'wonderful', 'perfect'];

  constructor(name, sex, genes, stats) {
    this.name = name;
    this.sex = sex;
    this.genes = genes;
    this.stats = stats;
  }

  // Returns finalized stats
  getStats() {
    return this.stats;
  }

  // Returns stats that were issued on birth
  getBirthStats() {
    return this.stats;
  }
}
