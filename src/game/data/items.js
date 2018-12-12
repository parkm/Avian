import InventoryItem from '../InventoryItem';

export default function genItemData() {
  let items = {
    gysahlGreens: {name: 'Gysahl Greens', type: 'feed', value: 100},
    mimettGreens: {name: 'Mimett Greens', type: 'feed', value: 150},
    carobNut: {name: 'Carob Nut', type: 'breedItem', value: 500},
    zeioNut: {name: 'Zeio Nut', type: 'breedItem', value: 1000},
    fireStone: {name: 'Fire Stone', type: 'breedItem', value: 5000},
    waterStone: {name: 'Water Stone', type: 'breedItem', value: 5000}
  }

  for (let id in items) {
    let item = items[id];
    items[id] = new InventoryItem(id, item.name, item.type, item.value)
  }

  return items;
}
