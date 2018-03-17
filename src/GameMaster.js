import Bird from './game/Bird';

export default class GameMaster {
  constructor() {
    this.money = 0;

    this.ownedBirds = [
      new Bird('PlayerBird', 400),
      new Bird('PlayerBird2', 200)
    ];

    let tmpRacers = [{
        name: 'player',
        speed: 400
      },  {
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
      {
        name: 'First Race',
        moneyReward: 100,
        racers: tmpRacers,
        length: 0.5
      }, {
        name: 'Second Race',
        moneyReward: 200,
        racers: tmpRacers2,
        length: 1
      }
    ];
  }

  onRaceComplete(race, placing) {
    this.money += race.moneyReward;
  }
}
