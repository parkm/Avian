export default class BirdRacer {
  constructor(name, speed) {
    this.speed = speed;
    this.elapsedDistance = 0;
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }
}
