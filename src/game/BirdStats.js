export default class BirdStats {
  constructor(stats) {
    this.topMph = stats.topMph;
    this.accel = stats.accel; // MPH gained per second
    this.stamina = stats.stamina;
    this.vigor = stats.vigor;
  }
}
