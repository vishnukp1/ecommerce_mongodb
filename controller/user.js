const Userschema = require("../models/Userschema");
const Productschema = require("../models/Productschema");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRegister = async (req,res) => {
  try{
       const {username,password,name,email}= req.body;

       const hashedPassword =  await bcrypt.hash(password,10)

       const user = new Userschema({ username:username,password:hashedPassword,name:name,email:email });

       await user.save()

       res.json(user)

       res.json({ message: 'user account registered successfully' })
  }
  catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while registering the user account' });
    }
}



const userlogin = async (req,res) => {
  try{
      const {username,password} = req.body;

      const user = await Userschema.findOne({username})
      if (!user ) {
        return res.status(401).json({ error: 'Invalid username ' });
      }
      if(!await bcrypt.compare(password, user.password)) {

        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({username:user.username}, 'secretkey',);  

        res.json({ message: 'Login successful' , token});
  }
 
  catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
}



const addToCart = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  try {
    const user = await Userschema.findById(userId);
    const product = await Productschema.findById(productId);
    console.log(productId);
    console.log(product);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }


    user.cart.push(product);
    await user.save();

    console.log("Product added to cart:", product);
    res.json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const user = await Userschema.findById(req.params.id).populate("cart");
    console.log(user);
    if (user) {
      console.log("User found:", user);
      res.json(user.cart); 
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const addToWishlist = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  try {
    const user = await Userschema.findById(userId);
    const product = await Productschema.findById(productId);
    console.log(productId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    user.wishlist.push(product);
    await user.save();

    console.log("Product added to wishlist:", product);
    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getWishlistByUserId = async (req, res) => {
  try {
    const user = await Userschema.findById(req.params.id).populate("wishlist");
    console.log(user);
    if (user) {
      console.log("User found:", user);
      res.json(user.wishlist); 
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFromWishlist = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  try {
   
    const user = await Userschema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    const productIndex = user.wishlist.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

 
    user.wishlist.splice(productIndex, 1);

    await user.save();

    console.log("Product removed from wishlist:", productId);
    res.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  userRegister,
  userlogin,
  addToCart,
  getCartByUserId,
  addToWishlist,
  getWishlistByUserId,
  deleteFromWishlist,
};
