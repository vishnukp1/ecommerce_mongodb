const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 
  name:{
   type:String,
   require:false
  },
username:{
    type:String,
    required:false,
    unique:false
},
password:{
    type:String,
    required:false
},
email:{
    type:String,
    required:false
},
cart: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
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