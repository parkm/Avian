import BreedItem from '../BreedItem';

export default function genBreedItemData() {
  let breedItems = {
    carobNut: {},
    zeioNut: {}
  }

  for (let id in breedItems) {
    let bi = breedItems[id];
    breedItems[id] = new BreedItem(id, bi);
  }

  return breedItems;
}
