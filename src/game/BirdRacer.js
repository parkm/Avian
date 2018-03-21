export default class BirdRacer {
  constructor(name, stats, isPlayer) {
    this.name = name;
    this.stats = stats;
    this.elapsedDistance = 0;
    this.completed = false;
    this.placing = null;
    this.isPlayer = isPlayer;

    this.staminaMax = this.stats.stamina;
    this.stamina = this.staminaMax;

    this.currentMph = 0;
  }

  frameUpdate(delta) {
    let accelPerMs = this.stats.accel / 1000;
    this.currentMph += accelPerMs * delta;

    if (this.currentMph >= this.stats.topMph) {
      this.currentMph = this.stats.topMph
    }

    this.stamina -= 0.01;

    let milesPerMs = this.currentMph / 60 / 60 / 1000;
    let distance = milesPerMs * delta;
    this.elapsedDistance += distance;
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }

  getStaminaPercent() {
    return this.stamina / this.staminaMax;
  }
}
