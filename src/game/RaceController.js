import BirdRacer from './BirdRacer';

export default class RaceController {
  constructor(raceData, racersData, playerBird) {
    this.length = raceData.length;
    this.racers = racersData.map(r => {
      return new BirdRacer(r.name, r.speed, false);
    });
    this.racers.push(new BirdRacer(playerBird.name, playerBird.mph, true));
    this.start = null;
    this.placingCounter = 0;
    this.raceCompleted = false;
  }

  frameUpdate(delta) {
    this.racers.forEach(r => {
      if (r.completed) return;
      let milesPerMs = r.speed / 60 / 60 / 1000;
      let distance = milesPerMs * delta;
      r.elapsedDistance += distance;
      if (r.elapsedDistance >= this.length) {
        r.placing = ++this.placingCounter;
        r.completed = true;
        if (r.isPlayer) {
          this.raceCompleted = true;
        }
      }
    });
  }
}
