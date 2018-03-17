import BirdRacer from './BirdRacer';

export default class RaceController {
  constructor(racersData) {
    this.racers = racersData.map(r => {
      return new BirdRacer(r.name, r.speed);
    });
  }
}
