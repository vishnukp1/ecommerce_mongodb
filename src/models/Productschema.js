const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
 
 title:{
   type:String,
   require:false
  },
description:{
    type:String,
    required:false,
},
price:{ 
    type:Number,
    required:false
},
image:{
    type:String,
    required:false
},
category:{
    type:String,
    required:false
},

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;