import InventoryItem from '../InventoryItem';

export default function genItemData() {
  let items = {
    gysahlGreens: {name: 'Gysahl Greens', type: 'feed', value: 100},
    mimettGreens: {name: 'Mimett Greens', type: 'feed', value: 150}
  }

  for (let id in items) {
    let item = items[id];
    items[id] = new InventoryItem(id, item.name, item.type, item.value)
  }

  return items;
}
