const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  description: { type: String },
  rating: { type: String },
  area: { type: String },
  done: {
    type: Boolean,
  },
})
module.exports = mongoose.model('Restaurant', RestaurantSchema)
