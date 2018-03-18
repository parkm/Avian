export default class BirdRacer {
  constructor(name, stats, isPlayer) {
    this.name = name;
    this.stats = stats;
    this.elapsedDistance = 0;
    this.completed = false;
    this.placing = null;
    this.isPlayer = isPlayer;
  }

  frameUpdate(delta) {
    let milesPerMs = this.stats.topMph / 60 / 60 / 1000;
    let distance = milesPerMs * delta;
    this.elapsedDistance += distance;
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }
}
