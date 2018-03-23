import InventoryItem from '../InventoryItem';

export default function genItemData() {
  let items = {
    gysahlGreens: {name: 'Gysahl Greens', type: 'greens'}
  }

  for (let id in items) {
    let item = items[id];
    items[id] = new InventoryItem(id, item.name, item.type)
  }

  return items;
}
