import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';
import RaceEvent from './game/RaceEvent';
import Inventory from './game/Inventory';
import genRaceEventsData from './game/data/races';
import genItemData from './game/data/items';
import genFeedData from './game/data/feeds';

export default class GameMaster {
  constructor() {
    this.money = 0;
    this.items = genItemData();
    this.feeds = genFeedData();
    this.inventory = new Inventory();

    this.inventory.addItem(this.items.gysahlGreens, 99);

    this.ownedBirds = [
      new Bird('PlayerBird', 'male', 'average', new BirdStats({
        topMph: 30,
        accel: 5,
        stamina: 5,
        vigor: 10
      })),
      new Bird('PlayerBird2', 'female', 'average', new BirdStats({
        topMph: 200,
        accel: 10,
        stamina: 10,
        vigor: 10
      })),
      new Bird('SuperBird', 'male', 'wonderful', new BirdStats({
        topMph: 300,
        accel: 30,
        stamina: 30,
        vigor: 30
      })),
      new Bird('The Winner', 'female', 'perfect', new BirdStats({
        topMph: 5000,
        accel: 5000,
        stamina: 30,
        vigor: 30
      }))
    ];

    this.completedRaces = {};
    this.completedEvents = {};

    this.raceEvents = genRaceEventsData();
    this.unlockedEventIds = {'openTrackDay': true};
  }

  getAllEvents() {
    return Object.values(this.raceEvents);
  }

  getUnlockedEvents() {
    return Object.keys(this.unlockedEventIds).map(id => {
      return this.raceEvents[id];
    });
  }

  isEventComplete(raceEvent) {
    let completedRaces = this.completedRaces[raceEvent.id];
    return Object.keys(raceEvent.races).every(raceId => {
      return (completedRaces[raceId] == true)
    });
  }

  onRaceComplete(race, placing) {
    this.money += race.getMoneyReward(placing);

    if (placing === 1) {
      let raceEvent = race.raceEvent;
      if (!this.completedRaces[raceEvent.id]) this.completedRaces[raceEvent.id] = {};
      this.completedRaces[raceEvent.id][race.id] = true;

      if (this.isEventComplete(raceEvent)) {
        this.completedEvents[raceEvent.id] = true;
        raceEvent.unlocks.forEach(eventId => this.unlockedEventIds[eventId] = true);
      }
    }
  }

  onFeedApplyToBird(bird, feedItem, feed, amount) {
    this.inventory.removeItem(feedItem, amount);
    bird.latentGrowth = feed.getStatsEffect().scale(amount).add(bird.latentGrowth).limit(bird.getLatentGrowthMax());
  }

  onTrainingComplete(bird, growth) {
    bird.latentGrowth = bird.latentGrowth.subtract(growth);
    bird.currentStats = bird.currentStats.add(growth);
  }
}
