import * as PIXI from 'pixi.js';
import chocoImg from 'res/gfx/choco.png';
import chocoRunImg from 'res/gfx/choco-run.png';
import grassImg from 'res/gfx/grass.png';
import orbImg from 'res/gfx/orb.png';
import redStarImg from 'res/gfx/red-star.png';

import Bird from './Bird.js';
import Orb from './Orb.js';
import Spawner from './Spawner.js';

export default class TrainingGameMaster {
  constructor(canvas) {
    this.pixiApp = new PIXI.Application({
      view: canvas,
      width: 1200,
      height: 800
    });

    let renderer = this.pixiApp.renderer;

    let grass = new PIXI.extras.TilingSprite(this.createTexture(grassImg), renderer.width, renderer.height);
    this.pixiApp.stage.addChild(grass);

    this.pixiApp.ticker.add(this.gameLoop);
    canvas.tabIndex = 0;
    canvas.focus();
    canvas.addEventListener('keydown', this.onKeyDown);

    this.bird = new Bird(this, this.createAnimationTextures(chocoRunImg, 4));
    this.bird.addToStage(this.pixiApp.stage);

    this.orbTex = this.createTexture(orbImg);
    this.badGuyTex = this.createTexture(redStarImg);
    this.spawner = new Spawner(this);
  }

  onKeyDown = (e) => {
    if (e.key === 'd') {
      this.bird.moving = 'right';
    } else if (e.key === 's') {
      this.bird.moving = 'down';
    } else if (e.key === 'a') {
      this.bird.moving = 'left';
    } else if (e.key === 'w') {
      this.bird.moving = 'up';
    }
  }

  gameLoop = () => {
    let delta = this.pixiApp.ticker.elapsedMS;
    this.bird.onLoopUpdate(delta);
    this.spawner.onLoopUpdate(delta);

    this.spawner.orbs.forEach(orb => {
      if (this.spriteOverlap(orb.sprite, this.bird.sprite)) {
        this.bird.onOrbCollide(orb);
        this.spawner.orbSpawnTime = this.spawner.initOrbSpawnTime - ((this.bird.speed / this.bird.maxSpeed) * (this.spawner.initOrbSpawnTime - this.spawner.minOrbSpawnTime));
        this.spawner.removeOrb(orb);
      }
    });

    this.spawner.bads.forEach(bad => {
      if (this.spriteOverlap(bad.sprite, this.bird.sprite)) {
        this.spawner.orbSpawnTime = this.spawner.initOrbSpawnTime;
        this.bird.speed *= 0.3;
        if (this.bird.speed < this.bird.initSpeed) this.bird.speed = this.bird.initSpeed;
        this.spawner.removeBad(bad);
        return;
      }
      bad.onLoopUpdate(delta);
      if (bad.sprite.y <= 0) this.spawner.removeBad(bad);
    });
  }

  createBaseTexture(imgSrc, scaleMode=PIXI.SCALE_MODES.NEAREST) {
    let img = document.createElement('img');
    img.src = imgSrc;
    return new PIXI.BaseTexture(img, scaleMode);
  }

  createTexture(imgSrc) {
    return new PIXI.Texture(this.createBaseTexture(imgSrc));
  }

  createAnimationTextures(imgSrc, count) {
    let baseTex = this.createBaseTexture(imgSrc);
    let texs = [];
    let cellWidth = baseTex.width / count;
    for (let i=0; i<count; ++i) {
      texs.push(new PIXI.Texture(baseTex, new PIXI.Rectangle(cellWidth * i, 0, cellWidth, baseTex.height)));
    }
    return texs;
  }

  // Returns true if the two sprites overlap
  spriteOverlap(a, b) {
    let ab = a.getBounds();
    let bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
  }
}
