export default class BirdRacer {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
    this.elapsedDistance = 0;
    this.completed = false;
    this.placing = null;
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }
}
