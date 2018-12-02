import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';
import RaceEvent from './game/RaceEvent';
import Inventory from './game/Inventory';
import genRaceEventsData from './game/data/races';
import genItemData from './game/data/items';
import genFeedData from './game/data/feeds';
import genBreedItemData from './game/data/breed_items';
import genBreedsData from './game/data/breeds';

export default class GameMaster {
  constructor() {
    this.version = '0.1.0';
    this.items = genItemData();
    this.feeds = genFeedData();
    this.breedItems = genBreedItemData();
    this.breeds = genBreedsData();

    this.loadDefaultGameData();
  }

  loadDefaultGameData() {
    this.money = 1000;
    this.fans = 0;
    this.inventory = new Inventory();
    this.inventory.addItem(this.items.gysahlGreens, 99);

    this.ownedBirds = [
      new Bird('PlayerBird', 'male', 'average', new BirdStats({
        topMph: 30,
        accel: 5,
        stamina: 5,
        vigor: 10
      }), this.breeds['yellow']),
      new Bird('PlayerBird2', 'female', 'average', new BirdStats({
        topMph: 200,
        accel: 10,
        stamina: 10,
        vigor: 10
      }), this.breeds['yellow']),
      new Bird('SuperBird', 'male', 'wonderful', new BirdStats({
        topMph: 300,
        accel: 30,
        stamina: 30,
        vigor: 30
      }), this.breeds['yellow']),
      new Bird('The Winner', 'female', 'perfect', new BirdStats({
        topMph: 5000,
        accel: 5000,
        stamina: 30,
        vigor: 30
      }), this.breeds['yellow'])
    ];

    this.completedRaces = {};
    this.completedEvents = {};

    this.raceEvents = genRaceEventsData();
    this.unlockedEventIds = {'openTrackDay': true};
  }

  loadGameDataFromSaveObject(save) {
    let gameData = JSON.parse(atob(save.gameData));
    this.money = gameData.money;
    this.fans = gameData.fans;
  }

  genSaveObjectFromGameData(note="") {
    let gameData = {
      money: this.money,
      fans: this.fans
    }
    return {
      version: this.version,
      date: (new Date()).toISOString(),
      note: note,
      gameData: btoa(JSON.stringify(gameData))
    }
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
    if (!completedRaces) return false;
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

  // Returns whether breed recipe matches
  matchesRecipe(recipe, birdA, birdB, breedItem) {
    if (recipe.item) {
      if (!breedItem || breedItem.id !== recipe.item) {
        return false;
      }
    }

    if (recipe.a) {
      if (birdA.breed.id !== recipe.a.breed && birdB.breed.id !== recipe.a.breed) {
        return false;
      }
    }

    if (recipe.b) {
      if (birdA.breed.id !== recipe.b.breed && birdB.breed.id !== recipe.b.breed) {
        return false;
      }
    }

    return true;
  }

  // Returns the breed that matches a breed recipe
  getMatchingBreed(birdA, birdB, breedItem) {
    for (let breedId in this.breeds) {
      let breed = this.breeds[breedId];
      if (!breed.recipe) continue;
      if (this.matchesRecipe(breed.recipe, birdA, birdB, breedItem)) {
        return breed;
      }
    }

    // If no breed matches
    return (Math.random() >= 0.5 ? birdA.breed : birdB.breed);
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

    bird.breed = this.getMatchingBreed(birdA, birdB, breedItem);

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
