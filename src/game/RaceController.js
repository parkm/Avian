import BirdRacer from './BirdRacer';

export default class RaceController {
  constructor(raceData, racersData, playerBird) {
    this.racers = racersData.map(r => {
      return new BirdRacer(r.name, r.stats, r.breedId, false);
    });
    this.playerRacer = new BirdRacer(playerBird.name, playerBird.getStats(), playerBird.breed.id, true)
    this.racers.push(this.playerRacer);

    this.length = raceData.length;
    this.start = null;
    this.placingCounter = 0;
    this.raceCompleted = false;

    this.terrains = raceData.terrains;
  }

  frameUpdate(delta) {
    this.racers.forEach(r => {
      if (r.completed) return;

      r.terrain = this.currentTerrain(r);
      r.frameUpdate(delta);

      if (r.elapsedDistance >= this.length) {
        r.placing = ++this.placingCounter;
        r.completed = true;
        if (r.isPlayer) {
          this.raceCompleted = true;
        }
      }
    });
  }

  currentTerrain(racer) {
    for (let i=0; i<this.terrains.length; ++i) {
      let t = this.terrains[i];
      let start = t[0];
      let end = t[1];
      let id = t[2];
      let progress = racer.elapsedDistance / this.length;
      if (progress >= start && progress <= end) {
        return id;
      }
    }
    return 'base';
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
