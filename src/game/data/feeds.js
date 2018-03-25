import Feed from '../Feed';

export default function genFeedData() {
  let feeds = {
    gysahlGreens: {
      effect: {
        topMph: 0.10,
        stamina: 0.05,
        vigor: 0.10,
        accel: 0.05
      }
    }
  }

  for (let id in feeds) {
    let feed = feeds[id];
    feeds[id] = new Feed(id, feed.effect);
  }

  return feeds;
}
