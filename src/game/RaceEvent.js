export default class RaceEvent {
  constructor(id, data) {
    this.id = id;
    this.name = data.name;
    this.restrictions = data.restrictions;
    this.races = data.races;
    this.rewards = data.rewards;
    this.unlocks = data.unlocks;
    for (let raceId in this.races) {
      let race = this.races[raceId];
      race.raceEvent = this;
      race.id = raceId;
    }
  }
}
