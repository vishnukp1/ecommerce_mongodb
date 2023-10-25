const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1, 
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  cart: [CartItemSchema],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      products: [
        {
          type: Number,
          default: 0,
        },
      ],
      orderId: {
        type: String,
        default: "",
      },
      totalAmount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
