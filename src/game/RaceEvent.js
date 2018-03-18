export default class RaceEvent {
  constructor(data) {
    this.name = data.name;
    this.restrictions = data.restrictions;
    this.races = data.races;
    this.rewards = data.rewards;
    this.unlocks = data.unlocks;
  }
}
