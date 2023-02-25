const { Food } = require('./food');
const { Item } = require('./item');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        for (let item of this.currentRoom.items) {
            if (item.name === itemName) {
                let indexOfItem = this.currentRoom.items.indexOf(item);
                this.items.push(item);
                this.currentRoom.items.splice(indexOfItem,1);
            }
        }
        return this.items
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        for (let item of this.items) {
            if (item.name === itemName) {
            let indexOfItem = this.items.indexOf(item);
            let droppedItem = this.items.splice(item,1);
            this.currentRoom.items.push(droppedItem[0])
            }
        }
        return this.items;
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        for (let item of this.items) {
            if (item.name === itemName && item instanceof Food) {
                let indexOfItem = this.items.indexOf(item);
                this.items.splice(indexOfItem,1);
            }
        }
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        for (let item of this.items) {
            if (item.name === name) return item;
        }

    }
}

module.exports = {
  Player,
};
