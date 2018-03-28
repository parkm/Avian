import Orb from './Orb.js';
import BadGuy from './BadGuy.js';

export default class Spawner {
  constructor(gm) {
    this.gm = gm;

    this.initOrbSpawnTime = 2000;
    this.minOrbSpawnTime = 150;
    this.orbSpawnTime = this.initOrbSpawnTime;
    this.orbSpawnTimer = 0;
    this.orbs = [];

    this.initBadSpawnTime = 2500;
    this.badSpawnTime = this.initBadSpawnTime;
    this.badSpawnTimer = 0;
    this.bads = [];
    this.maxBads = 10;

    this.orbTypesCounter = 0;
    this.orbTypes = ['speed', 'stamina', 'accel', 'vigor'];
  }

  spawnOrb() {
    let orb = new Orb(this.gm, this.gm.orbTex, this.orbTypes[this.orbTypesCounter]);
    this.orbTypesCounter++;
    if (this.orbTypesCounter >= this.orbTypes.length) this.orbTypesCounter = 0;
    orb.sprite.x = Math.random() * this.gm.pixiApp.renderer.width;
    orb.sprite.y = Math.random() * this.gm.pixiApp.renderer.height;
    this.gm.pixiApp.stage.addChild(orb.sprite);
    this.orbs.push(orb);
  }

  spawnBadGuy() {
    let bad = new BadGuy(this.gm, this.gm.badGuyTex);
    bad.sprite.x = this.gm.pixiApp.renderer.width / 2;
    bad.sprite.y = this.gm.pixiApp.renderer.height;
    this.gm.pixiApp.stage.addChild(bad.sprite);
    this.bads.push(bad);
    if (this.bads.length > this.maxBads) {
      this.removeBad(this.bads[0]);
    }
  }

  onLoopUpdate(delta) {
    this.orbSpawnTimer += delta;
    this.badSpawnTimer += delta;

    if (this.orbSpawnTimer >= this.orbSpawnTime) {
      this.orbSpawnTimer = 0;
      this.spawnOrb();
    }

    if (this.badSpawnTimer >= this.badSpawnTime) {
      this.badSpawnTimer = 0;
      this.spawnBadGuy();
    }
  }

  removeOrb(orb) {
    this.gm.pixiApp.stage.removeChild(orb.sprite);
    this.orbs.splice(this.orbs.indexOf(orb), 1);
  }

  removeBad(bad) {
    this.gm.pixiApp.stage.removeChild(bad.sprite);
    this.bads.splice(this.bads.indexOf(bad), 1);
  }
}
