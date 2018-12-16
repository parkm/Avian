export default class StatBuff {
  constructor(statBuffPerc, duration, icon) {
    this.statBuffPerc = statBuffPerc;
    this.duration = duration * 1000;
    this.icon = icon;
    this.elapsed = 0;
    this.completed = false;
  }

  frameUpdate(delta) {
    this.elapsed += delta;
    if (this.elapsed >= this.duration) {
      this.completed = true;
    }
  }
}
