import Bird from './game/Bird';
import BirdStats from './game/BirdStats';
import Race from './game/Race';

export default class GameMaster {
  constructor() {
    this.money = 0;

    this.ownedBirds = [
      new Bird('PlayerBird', new BirdStats({
        topMph: 400,
        accel: 10,
        stamina: 10,
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
      }))
    ];

    let tmpRacers = [{
        name: 'another guy',
        stats: new BirdStats({
          topMph: 250,
          accel: 30,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'more',
        stats: new BirdStats({
          topMph: 150,
          accel: 30,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'people',
        stats: new BirdStats({
          topMph: 100,
          accel: 30,
          stamina: 30,
          vigor: 30
        })
      }, {
        name: 'test',
        stats: new BirdStats({
          topMph: 230,
          accel: 30,
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
      accel: 30,
      stamina: 30,
      vigor: 30
    })});
    this.availableRaces = [
      new Race('First Race', tmpRacers, 0.5, {
        '1': {
          money: 100
        },
        '2': {
          money: 25
        },
        '3': {
          money: 10
        }
      }),
      new Race('Second Race', tmpRacers2, 1, {
        '1': {
          money: 200
        },
        '2': {
          money: 50
        },
        '3': {
          money: 20
        }
      })
    ];
  }

  onRaceComplete(race, placing) {
    this.money += race.getMoneyReward(placing);
  }
}
