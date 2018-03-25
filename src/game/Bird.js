import BirdStats from 'game/BirdStats';

export default class Bird {
  static GENES = ['poor', 'average', 'good', 'great', 'wonderful', 'perfect'];
  static GENES_STRENGTH = {
    'poor': 2,
    'average': 4,
    'good': 6,
    'great': 8,
    'wonderful': 10,
    'perfect': 20
  };

  constructor(name, sex, genes, birthStats) {
    this.name = name;
    this.sex = sex;
    this.genes = genes;
    this.birthStats = birthStats;
    this.currentStats = birthStats.clone();
    this.maxStats = this.genMaxStats(this.birthStats, this.genes);
    this.latentGrowth = BirdStats.zero();
  }

  genMaxStats(birthStats, genes) {
    return birthStats.scale(1 + Bird.GENES_STRENGTH[genes] / 100);
  }

  getBirthStats() {
    return this.birthStats;
  }

  // Returns finalized stats
  getStats() {
    return this.currentStats;
  }

  // Returns maximum possible stats this bird can achieve
  getMaxStats() {
    return this.maxStats;
  }

  // Returns stats that were issued on birth
  getBirthStats() {
    return this.birthStats;
  }

  // Returns the amount that current stats can be currently improved by
  getLatentGrowth() {
    return this.latentGrowth;
  }

  // Returns the total amount of growth possible
  getLatentGrowthMax() {
    return this.maxStats.subtract(this.currentStats)
  }
}
