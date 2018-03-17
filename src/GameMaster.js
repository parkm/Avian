export default class GameMaster {
  constructor() {
    this.money = 0;

    let tmpRacers = [{
        name: 'player',
        speed: 60
      },  {
        name: 'another guy',
        speed: 25
      }, {
        name: 'more',
        speed: 20
      }, {
        name: 'people',
        speed: 10
      }, {
        name: 'test',
        speed: 23
      }, {
        name: 'choco',
        speed: 28
      }
    ];
    let tmpRacers2 = Array.from(tmpRacers);
    tmpRacers2.push({name: 'onemore'});
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
