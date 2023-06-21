const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
 
 title:{
   type:String,
   require:true
  },
description:{
    type:String,
    required:true,
    
},
price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;