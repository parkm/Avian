import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';
import RaceEvent from './game/RaceEvent';
import Inventory from './game/Inventory';
import genRaceEventsData from './game/data/races';
import genItemData from './game/data/items';
import genFeedData from './game/data/feeds';
import genBreedItemData from './game/data/breed_items';

export default class GameMaster {
  constructor() {
    this.money = 1000;
    this.fans = 0;
    this.items = genItemData();
    this.feeds = genFeedData();
    this.breedItems = genBreedItemData();
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

  isRaceComplete(race) {
    if (!this.completedRaces[race.raceEvent.id]) return false;
    return (this.completedRaces[race.raceEvent.id][race.id] === true);
  }

  isEventComplete(raceEvent) {
    let completedRaces = this.completedRaces[raceEvent.id];
    return Object.keys(raceEvent.races).every(raceId => {
      return (completedRaces[raceId] == true)
    });
  }

  // Returns a set of race restrictions that did not pass
  getFailedRaceEventConditions(raceEvent) {
    let restrict = raceEvent.restrictions;
    return {
      fans: (this.fans >= (restrict.fans || 0))
    };
  }

  onBirdBreed(birdA, birdB, breedItem) {
    let stats = birdA.getStats().average(birdB.getStats());
    let genes = Bird.mergeGenes(birdA.genes, birdB.genes);
    let sex = Math.random() > 0.5 ? 'male' : 'female';
    let bird = new Bird('', sex, genes, stats);

    if (breedItem) {
      this.inventory.removeItem(breedItem, 1);
    }

    bird.mother = birdA.sex === 'female' ? birdA : birdB;
    bird.father = birdA.sex === 'male' ? birdA : birdB;
    return bird;
  }

  onBirdBreedComplete(bird, name) {
    bird.name = name;
    this.ownedBirds.push(bird);
  }

  onRaceEventComplete(raceEvent) {
    this.completedEvents[raceEvent.id] = true;
    if (raceEvent.unlocks) {
      raceEvent.unlocks.forEach(eventId => this.unlockedEventIds[eventId] = true);
    }
    this.money += raceEvent.rewards.money || 0;
    this.fans += raceEvent.rewards.fans || 0;
    let itemRewards = raceEvent.rewards.items;
    if (itemRewards) {
      for (let itemId in itemRewards) {
        let itemCount = itemRewards[itemId];
        this.inventory.addItem(this.items[itemId], itemCount);
      }
    }
  }

  onRaceComplete(race, placing) {
    this.money += race.getMoneyReward(placing);
    this.fans += race.getFansReward(placing);

    if (placing === 1) {
      let raceEvent = race.raceEvent;
      if (!this.completedRaces[raceEvent.id]) this.completedRaces[raceEvent.id] = {};
      this.completedRaces[raceEvent.id][race.id] = true;

      let itemRewards = race.rewards[placing.toString()].items;
      if (itemRewards) {
        for (let itemId in itemRewards) {
          let itemCount = itemRewards[itemId];
          this.inventory.addItem(this.items[itemId], itemCount);
        }
      }

      if (this.isEventComplete(raceEvent)) {
        this.onRaceEventComplete(raceEvent);
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
