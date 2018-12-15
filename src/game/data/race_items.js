import RaceItem from '../RaceItem';

export default function genRaceItemData() {
  let raceItems = {
    topGear: {
      type: 'stat_buff',
      statBuffPerc: {
        topMph: 1.25
      },
      duration: 20
    }
  }

  for (let id in raceItems) {
    let ri = raceItems[id];
    raceItems[id] = new RaceItem(id, ri);
  }

  return raceItems;
}
