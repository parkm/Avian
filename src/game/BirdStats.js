export default class BirdStats {
  static STAT_NAMES = [
    'topMph', 'accel', 'stamina', 'vigor'
  ];

  // Returns a set of bird stats with all stats set to zero
  static zero() {
    let stats = new BirdStats({});
    stats.forEachStat((name, value) => stats[name] = 0)
    return stats;
  }

  constructor(stats) {
    this.topMph = stats.topMph;
    this.accel = stats.accel; // MPH gained per second
    this.stamina = stats.stamina;
    this.vigor = stats.vigor;
  }

  // Multiplies all stats by the scalar and returns a new set of stats.
  scale(scalar) {
    let stats = {};
    this.forEachStat((name, value) => {
      stats[name] = value * scalar;
    })
    return new BirdStats(stats);
  }

  // Returns a new set of stats of the sum of current stats and the provided stats.
  add(stats) {
    let sum = new BirdStats({});
    this.forEachStat((name, value) => {
      sum[name] = value + stats[name];
    });
    return sum;
  }

  // Returns a new set of stats of the current stats subtracted by the provided stats.
  subtract(stats) {
    let diff = new BirdStats({});
    this.forEachStat((name, value) => {
      diff[name] = value - stats[name];
    });
    return diff;
  }

  // Returns a new set of stats that do not exceed and are limited by the provided stats
  limit(maxStats) {
    let stats = new BirdStats({});
    this.forEachStat((name, value) => {
      if (value > maxStats[name]) {
        stats[name] = maxStats[name];
      } else {
        stats[name] = value;
      }
    });
    return stats;
  }

  // Returns a duplicate of bird stats
  clone() {
    let stats = {};
    this.forEachStat((name, value) => stats[name] = value)
    return new BirdStats(stats);
  }

  forEachStat(callback) {
    BirdStats.STAT_NAMES.forEach(statName => {
      callback(statName, this[statName]);
    });
  }
}
