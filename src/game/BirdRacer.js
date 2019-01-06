import StatBuff from './StatBuff'

export default class BirdRacer {
  constructor(name, stats, breed, isPlayer) {
    this.name = name;
    this.breed = breed;
    this.stats = stats;
    this.elapsedDistance = 0;
    this.completed = false;
    this.placing = null;
    this.isPlayer = isPlayer;

    this.movement = 'sprint'

    this.staminaMax = this.stats.stamina;
    this.stamina = this.staminaMax;

    this.currentMph = 0;

    this.deaccelSpeed = null;

    this.staminaGainPerSecond = this.staminaMax * (this.stats.vigor / 100);

    this.terrain = 'base'; // Modified by the race controller

    this.buffs = [];
  }

  frameUpdate(delta) {
    let topMph = this.getTopMph();

    if (this.currentMph >= topMph) {
      if (this.deaccelSpeed) {
        let deaccel = this.deaccelSpeed * 0.75;
        this.currentMph -= (deaccel / 1000) * delta;
      } else {
        this.currentMph = topMph;
      }
    } else {
      if (this.deaccelSpeed !== null) this.deaccelSpeed = null;
      let accelPerMs = this.stats.accel / 1000;
      this.currentMph += accelPerMs * delta;
    }

    this.updateStamina(delta);

    let milesPerMs = this.currentMph / 60 / 60 / 1000;
    let distance = milesPerMs * delta;
    this.elapsedDistance += distance;

    if (this.isPlayer) {
      this.handleBuffs(delta);
    } else {
      this.handleAi(delta);
    }
  }

  handleAi() {
    if (this.movement === 'trot' && this.stamina >= this.staminaMax) {
      this.setMovement('sprint');
    }
  }

  handleBuffs(delta) {
    let removeBuffs = [];
    this.buffs.forEach(buff => {
      buff.frameUpdate(delta);
      if (buff.completed) {
        removeBuffs.push(this.buffs.indexOf(buff));
      }
    });

    removeBuffs.forEach(index => {
      this.buffs.splice(index, 1);
    });
  }

  updateStamina(delta) {
    if (this.movement === 'trot') {
      // TODO: implement vigor stat
      if (this.stamina < this.staminaMax)
        this.stamina += (this.staminaGainPerSecond / 1000) * delta;
      else
        this.stamina = this.staminaMax;
    } else if (this.movement === 'sprint') {
      this.stamina -= delta / 1000;
    }

    if (this.stamina <= 0 && this.movement !== 'trot') {
      this.setMovement('trot');
    }
  }

  getTopMph() {
    let speedBuff = 1;
    if (this.terrain === 'water' && this.breed.id !== 'blue') speedBuff = 0.1;
    if (this.terrain === 'forest' && this.breed.id !== 'green') speedBuff = 0.75;
    if (this.terrain === 'forest') {
      if (this.breed.id === 'green') {
        speedBuff = 1.25
      } else {
        speedBuff = 0.75
      }
    }

    this.buffs.forEach(buff => {
      if (buff.statBuffPerc.topMph) {
        speedBuff += buff.statBuffPerc.topMph;
      }
    });

    if (this.movement === 'trot') {
      return (this.stats.topMph * 0.25) * speedBuff;
    } else if (this.movement === 'sprint') {
      return this.stats.topMph * speedBuff;
    }
  }

  setMovement(movement) {
    this.movement = movement;

    if (this.currentMph > this.getTopMph()) {
      this.deaccelSpeed = this.currentMph;
    }
  }

  // Returns progress as a decimal percentage
  getProgressPercent(raceLength) {
    return this.elapsedDistance / raceLength;
  }

  getStaminaPercent() {
    return this.stamina / this.staminaMax;
  }

  applyStatBuff(raceItem, icon) {
    console.log(icon);
    let buff = new StatBuff(raceItem.statBuffPerc, raceItem.duration, icon);
    this.buffs.push(buff);
  }
}
