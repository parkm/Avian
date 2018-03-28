import * as PIXI from 'pixi.js';

export default class Bird {
  constructor(gm, spriteTextures) {
    this.gm = gm;
    this.sprite = new PIXI.extras.AnimatedSprite(spriteTextures);

    this.spriteScaleX = 2;
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;

    this.sprite.animationSpeed = 0.15;
    this.moving = null;

    this.initSpeed = 0.2;
    this.speed = this.initSpeed;
    this.maxSpeed = 2;
  }

  addToStage(stage) {
    stage.addChild(this.sprite);
    this.sprite.play();
  }

  onLoopUpdate(delta) {
    let speed = this.speed * delta;
    if (this.moving === 'right') {
      this.sprite.x += speed;
      this.sprite.anchor.x = 0;
      this.sprite.scale.x = this.spriteScaleX;
    } else if (this.moving === 'down') {
      this.sprite.y += speed;
    } else if (this.moving === 'left') {
      this.sprite.x -= speed;
      this.sprite.anchor.x = 1;
      this.sprite.scale.x = -this.spriteScaleX;
    } else if (this.moving === 'up') {
      this.sprite.y -= speed;
    }

    if (this.sprite.x < -this.sprite.width) this.sprite.x = this.gm.pixiApp.renderer.width;
    if (this.sprite.y < -this.sprite.height) this.sprite.y = this.gm.pixiApp.renderer.height;
    if (this.sprite.x > this.gm.pixiApp.renderer.width) this.sprite.x = 0;
    if (this.sprite.y > this.gm.pixiApp.renderer.height) this.sprite.y = 0;
  }

  onOrbCollide(orb) {
    this.speed *= 1.1;
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
  }
}
