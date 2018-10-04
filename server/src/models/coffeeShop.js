const mongoose = require('mongoose')

let coffeeShop = mongoose.model('CoffeeShop', new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true},
  visited: { type: Boolean, default: false },
  stars: { type: Number, min: 0, max: 5}
}))

module.exports = coffeeShop
