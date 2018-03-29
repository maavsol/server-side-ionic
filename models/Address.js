const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    streetName: String,
    postalCode: Number,
    Floor: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Order = mongoose.model('Order', addressSchema);
module.exports = Order;
