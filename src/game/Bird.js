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

  // Takes two genes and returns the closest average gene between the two
  static mergeGenes(gene1, gene2) {
    let gstr = Bird.GENES_STRENGTH;
    let avg = (gstr[gene1] + gstr[gene2]) / 2;
    let dist = [];

    for (let geneName in gstr) {
      let gval = gstr[geneName];
      dist.push({name: geneName, val: Math.abs(avg - gval)});
    }

    return dist.sort((a, b) => a.val - b.val)[0].name;
  }

  constructor(name, sex, genes, birthStats, breed) {
    this.name = name;
    this.sex = sex;
    this.genes = genes;
    this.birthStats = birthStats;
    this.currentStats = birthStats.clone();
    this.maxStats = this.genMaxStats(this.birthStats, this.genes);
    this.latentGrowth = BirdStats.zero();
    this.mother = null;
    this.father = null;
    this.breed = breed;
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

  // Returns whether the two birds are kin
  isKin(bird) {
    if ((this.mother === null && this.father === null) && (bird.mother === null && bird.father === null))
      return false;
    return (
     (this.mother === bird || this.father === bird) ||
     (bird.mother === this || bird.father === this) ||
     (this.mother === bird.mother || this.father === bird.father)
    );
  }

  // Calculates money worth of bird based on stats and genes
  getWorth() {
    let stats = this.getStats();
    let worth = 0;
    stats.forEachStat((name, value) => {
      switch(name) {
        case 'topMph': return worth += value * 1.4
        case 'accel': return worth += value * 5
        case 'stamina': return worth += value * 3
        case 'vigor': return worth += value * 12
      }
    });

    switch(this.genes) {
      case 'poor': worth *= 0.5; break;
      case 'average': worth *= 1; break;
      case 'good': worth *= 1.1; break;
      case 'great': worth *= 1.2; break;
      case 'wonderful': worth *= 1.5; break;
      case 'perfect': worth *= 2; break;
    }

    return Math.round(worth * 0.8);
  }
}
