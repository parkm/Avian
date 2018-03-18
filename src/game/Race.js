export default class Race {
  constructor(name, racers, length, rewards) {
    this.name = name;
    this.racers = racers;
    this.length = length;
    this.rewards = rewards;
  }

  getMoneyReward(placing) {
    let reward = this.rewards[placing];
    if (reward) {
      return reward.money;
    } else {
      return 0;
    }
  }
}