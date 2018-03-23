import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';
import RaceEvent from './game/RaceEvent';
import genRaceEventsData from './game/data/races';

export default class GameMaster {
  constructor() {
    this.money = 0;

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
        topMph: 1000,
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

    this.raceEvents = genRaceEventsData();
  }

  onRaceComplete(race, placing) {
    this.money += race.getMoneyReward(placing);
  }
}
