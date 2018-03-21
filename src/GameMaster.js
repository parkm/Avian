import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';
import RaceEvent from './game/RaceEvent';
import genRaceEventsData from './game/data/races';

export default class GameMaster {
  constructor() {
    this.money = 0;

    this.ownedBirds = [
      new Bird('PlayerBird', new BirdStats({
        topMph: 400,
        accel: 100,
        stamina: 3,
        vigor: 10
      })),
      new Bird('PlayerBird2', new BirdStats({
        topMph: 200,
        accel: 10,
        stamina: 10,
        vigor: 10
      })),
      new Bird('SuperBird', new BirdStats({
        topMph: 1000,
        accel: 30,
        stamina: 30,
        vigor: 30
      })),
      new Bird('The Winner', new BirdStats({
        topMph: 5000,
        accel: 5000,
        stamina: 30,
        vigor: 30
      }))
    ];

    let tmpRacers = [{
        name: 'another guy',
        stats: new BirdStats({
          topMph: 250,
          accel: 10,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'more',
        stats: new BirdStats({
          topMph: 150,
          accel: 11,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'people',
        stats: new BirdStats({
          topMph: 100,
          accel: 20,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'test',
        stats: new BirdStats({
          topMph: 230,
          accel: 5,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'choco',
        stats: new BirdStats({
          topMph: 280,
          accel: 30,
          stamina: 30,
          vigor: 30
        })
      }
    ];
    let tmpRacers2 = Array.from(tmpRacers);
    tmpRacers2.push({name: 'super', stats: new BirdStats({
      topMph: 800,
      accel: 40,
      stamina: 30,
      vigor: 30
    })});
    this.raceEvents = genRaceEventsData();
  }

  onRaceComplete(race, placing) {
    this.money += race.getMoneyReward(placing);
  }
}
