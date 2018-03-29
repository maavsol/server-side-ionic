const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    telephone: Number,
    pepperoniPrice: Number,
    barbacuePrice: Number,
    hamAndCheesePrice: Number,
    fourCheesePrice: Number,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
