import BirdStats from 'game/BirdStats';

export default class Feed {
  constructor(id, effect) {
    this.id = id;
    this.effect = effect;
  }

  getStatsEffect() {
    return new BirdStats(this.effect);
  }
}
