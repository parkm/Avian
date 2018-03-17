import BirdRacer from './BirdRacer';

export default class RaceController {
  constructor(raceData, racersData) {
    this.length = raceData.length;
    this.racers = racersData.map(r => {
      return new BirdRacer(r.name, r.speed);
    });
    this.start = null;
  }

  frameUpdate(delta) {
    this.racers.forEach(r => {
      let milesPerMs = r.speed / 60 / 60 / 1000;
      let distance = milesPerMs * delta;
      r.elapsedDistance += distance;
    });
  }
}
