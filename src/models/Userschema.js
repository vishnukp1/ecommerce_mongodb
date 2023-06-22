const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 
  name:{
   type:String,
   require:true
  },
username:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
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