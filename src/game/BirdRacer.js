export default class BirdRacer {
  constructor(name, speed, isPlayer) {
    this.name = name;
    this.speed = speed;
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
