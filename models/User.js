const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    telephone: { type: Number, default: undefined },
    role: {
      type: String,
      enum: ['admin', 'restaurant', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
