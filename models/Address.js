const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    streetName: String,
    postalCode: Number,
    floor: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Order = mongoose.model('Address', addressSchema);
module.exports = Order;
