export default class Race {
  constructor(name, racers, length, rewards, terrains=[]) {
    this.name = name;
    this.racers = racers;
    this.length = length;
    this.rewards = rewards;
    this.terrains = terrains;
  }

  getMoneyReward(placing) {
    let reward = this.rewards[placing];
    if (reward) {
      return reward.money;
    } else {
      return 0;
    }
  }

  getFansReward(placing) {
    let reward = this.rewards[placing];
    if (reward && reward.fans) {
      return reward.fans;
    } else {
      return 0;
    }
  }
}
