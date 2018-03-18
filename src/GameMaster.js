import Bird from './game/Bird';
import Race from './game/Race';

export default class GameMaster {
  constructor() {
    this.money = 0;

    this.ownedBirds = [
      new Bird('PlayerBird', 400),
      new Bird('PlayerBird2', 200),
      new Bird('SuperBird', 1000)
    ];

    let tmpRacers = [{
        name: 'another guy',
        speed: 250
      }, {
        name: 'more',
        speed: 200
      }, {
        name: 'people',
        speed: 100
      }, {
        name: 'test',
        speed: 230
      }, {
        name: 'choco',
        speed: 280
      }
    ];
    let tmpRacers2 = Array.from(tmpRacers);
    tmpRacers2.push({name: 'super', speed: 200});
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
