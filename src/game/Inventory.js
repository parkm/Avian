export default class Inventory {
  constructor() {
    this.itemsMap = new Map();
  }

  static fromJSON(itemDb, json) {
    let inv = new Inventory();
    JSON.parse(json).forEach(item => {
      let itemId = item[0];
      let itemCount = item[1];
      if (!itemDb[itemId]) return;
      inv.addItem(itemDb[itemId], itemCount);
    });
    return inv;
  }

  toJSON() {
    let itemsArray = [];
    this.itemsMap.forEach(item => {
      itemsArray.push([item.id, item.count]);
    });
    return JSON.stringify(itemsArray);
  }

  hasItem(inventoryItem) {
    return this.itemsMap.has(inventoryItem.id);
  }

  getItemCount(inventoryItem) {
    let item = this.itemsMap.get(inventoryItem.id);
    if (item)
      return item.count;
    else
      return 0;
  }

  getItemsByType(type) {
    let items = [];
    this.itemsMap.forEach(item => {
      if (item.type === type) {
        items.push(item);
      }
    });
    return items;
  }

  addItem(inventoryItem, count) {
    let id = inventoryItem.id;
    if (this.itemsMap.has(id)) {
      this.itemsMap.get(inventoryItem.id).count += count;
    } else {
      let item = Object.assign({}, inventoryItem);
      item.count = count;
      this.itemsMap.set(id, item);
    }
  }

  removeItem(inventoryItem, count) {
    let id = inventoryItem.id;
    if (!this.itemsMap.has(id)) return;

    let item = this.itemsMap.get(inventoryItem.id);
    item.count -= count;
    if (item.count <= 0) {
      this.itemsMap.delete(id);
    }
  }
}
