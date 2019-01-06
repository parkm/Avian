import InventoryItem from '../InventoryItem';
import topGearIcon from 'res/gfx/top-gear.png';

export default function genItemData() {
  let items = {
    gysahlGreens: {name: 'Gysahl Greens', type: 'feed', value: 100},
    mimettGreens: {name: 'Mimett Greens', type: 'feed', value: 150},
    carobNut: {name: 'Carob Nut', type: 'breedItem', value: 500},
    zeioNut: {name: 'Zeio Nut', type: 'breedItem', value: 1000},
    fireStone: {name: 'Fire Stone', type: 'breedItem', value: 5000},
    waterStone: {
      name: 'Water Crystal', type: 'breedItem', value: 5000,
      description: 'Infuses offspring with elements of water.'
    },
    fireStone: {
      name: 'Fire Crystal', type: 'breedItem', value: 5000,
      description: 'Infuses offspring with elements of fire.'
    },
    topGear: {
      name: 'Top Gear', type: 'raceItem', value: 500,
      description: 'Increases Top Speed by 25% for 20 seconds.',
      icon: topGearIcon
    },
    goodFormula: {
      name: 'Good Formula', type: 'breedItem', value: 5000,
      description: 'Guarantees offspring with good genes.'
    }
  }

  for (let id in items) {
    let item = items[id];
    items[id] = new InventoryItem(id, item.name, item.type, item.value, item.icon || null, item.description || '')
  }

  return items;
}
