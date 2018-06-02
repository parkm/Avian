import * as PIXI from 'pixi.js';
import grassImg from 'res/gfx/grass.png';


export default class ExploreGameMaster {
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
  }


  onKeyDown = (e) => {
    console.log(e.key);
  }

  gameLoop = () => {
    let delta = this.pixiApp.ticker.elapsedMS;
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
