export default class BirdRacer {
  constructor(name, stats, isPlayer) {
    this.name = name;
    this.stats = stats;
    this.elapsedDistance = 0;
    this.completed = false;
    this.placing = null;
    this.isPlayer = isPlayer;
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }
}
