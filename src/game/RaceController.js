import BirdRacer from './BirdRacer';

export default class RaceController {
  constructor(raceData, racersData, playerBird) {
    this.racers = racersData.map(r => {
      return new BirdRacer(r.name, r.stats, false);
    });
    this.playerRacer = new BirdRacer(playerBird.name, playerBird.stats, true)
    this.racers.push(this.playerRacer);

    this.length = raceData.length;
    this.start = null;
    this.placingCounter = 0;
    this.raceCompleted = false;
  }

  frameUpdate(delta) {
    this.racers.forEach(r => {
      if (r.completed) return;
      let milesPerMs = r.stats.topMph / 60 / 60 / 1000;
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

  getPlacings() {
    let placed = this.racers.filter(r => r.placing > 0);
    let placings = {};
    this.racers.sort((a, b) => a.elapsedDistance < b.elapsedDistance).forEach(r => {
      if (!r.placing) {
        placed.push(r);
        r.placing = placed.length;
      }
      placings[r.placing] = r;
    });
    return placings;
  }
}
