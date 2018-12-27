import BreedItem from '../BreedItem';

export default function genBreedItemData() {
  let breedItems = {
    carobNut: {},
    zeioNut: {},
    waterStone: {},
    fireStone: {},
    goodFormula: {
      genes: 'good'
    }
  }

  for (let id in breedItems) {
    let bi = breedItems[id];
    breedItems[id] = new BreedItem(id, bi);
  }

  return breedItems;
}
