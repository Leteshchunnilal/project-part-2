// Hotbar System
class Hotbar {
  constructor(containerId = 'hotbar', maxSlots = 6) {
    this.container = document.getElementById(containerId);
    this.maxSlots = maxSlots;
    this.currentSlot = 0;
    this.items = [];

    // Initialize empty slots
    for (let i = 0; i < maxSlots; i++) {
      this.items.push({
        name: '',
        icon: '?',
        callback: null
      });
    }

    this.render();
    this.setupKeyListeners();
  }

  // add item to hotbar
  addItem(slotIndex, name, icon, callback) {
    if (slotIndex >= 0 && slotIndex < this.maxSlots) {
      this.items[slotIndex] = {
        name: name,
        icon: icon,
        callback: callback
      };
      this.render();
    }
  }

  // select a slot
  selectSlot(slotIndex) {
    if (slotIndex >= 0 && slotIndex < this.maxSlots) {
      this.currentSlot = slotIndex;
      this.onSlotSelected();
      this.render();
    }
  }

  // get current selected item
  getCurrentItem() {
    return this.items[this.currentSlot];
  }

  // render hotbar
  render() {
    this.container.innerHTML = '';

    this.items.forEach((item, index) => {
      const slot = document.createElement('div');
      slot.className = 'hotbar-slot' + (this.currentSlot === index ? ' active' : '');
      slot.setAttribute('data-index', index);

      slot.innerHTML = `
        <div class="hotbar-slot-key">${index + 1}</div>
        <div class="hotbar-slot-icon">${item.icon}</div>
      `;

      slot.addEventListener('click', () => this.selectSlot(index));
      this.container.appendChild(slot);
    });
  }

  // listener for when you prerss the key
  setupKeyListeners() {
    document.addEventListener('keydown', (e) => {
      const key = parseInt(e.key);
      if (key >= 1 && key <= this.maxSlots) {
        this.selectSlot(key - 1);
      }
    });
  }

  // called when a slot is selected - override this or add callback
  onSlotSelected() {
    const item = this.getCurrentItem();
    console.log(`Selected: ${item.name}`);
    
    // Call the item's callback if it exists
    if (item.callback) {
      item.callback();
    }
  }
}

// load hotbar when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.hotbar = new Hotbar('hotbar', 4);

  
  window.hotbar.addItem(0, 'Pistol', '🔫', () => {
    console.log('Pistol selected!');
  });

  window.hotbar.addItem(1, 'Knife', '🔦', () => {
    console.log('Knife selected!');
  });
});
