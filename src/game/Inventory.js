export default class Inventory {
  constructor() {
    this.itemCounts = new Map();
  }

  hasItem(inventoryItem) {
    return this.itemCounts.has(inventoryItem.id);
  }

  getItemCount(inventoryItem) {
    return this.itemCounts.get(inventoryItem.id);
  }

  addItem(inventoryItem, count) {
    let id = inventoryItem.id;
    if (this.itemCounts.has(id)) {
      this.itemCounts.set(id, this.itemCounts.get(id) + count);
    } else {
      this.itemCounts.set(id, count);
    }
  }

  removeItem(inventoryItem, count) {
    let id = inventoryItem.id;
    if (!this.itemCounts.has(id)) return;

    let setTo = this.itemCounts.get(id) - count;
    if (setTo <= 0) {
      this.itemCounts.delete(id);
    } else {
      this.itemCounts.set(id, setTo);
    }
  }
}
