const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    addressToServe: { type: Schema.Types.ObjectId, ref: 'Address' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    numberOfPepperoniOrdered: Number,
    numberOfBarbacueOrdered: Number,
    numberOfFourCheeseOrdered: Number,
    numberOfHamAndCheeseOrdered: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
