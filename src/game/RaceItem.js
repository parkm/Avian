export default class RaceItem {
  constructor(id, opts) {
    this.id = id;
    this.type = opts.type;
    this.statBuffPerc = opts.statBuffPerc || null;
    this.duration = opts.duration;
  }
}
