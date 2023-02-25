let {Item} = require('./item');
// Create an edible `Food` class that inherits from the `Item` class
    class Food extends Item {
        constructor (name,description) {
            super (name,description)
        }
    }
// Your code here

module.exports = {Food}
