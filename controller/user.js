const Userschema = require("../models/Userschema");
const Productschema = require("../models/Productschema");
const express = require("express");
const bcrypt = require('bcrypt');

// Create a new user detail
const createUser = async (req, res) => {
  try {
    const newUser = await Userschema.create(req.body);
    console.log("User created:", newUser);
    res.status(201).json(newUser); // Send the created user as a JSON response
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// loging user
const Userlogin=async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user document by username
    const user = await Userschema.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    // Compare the provided password with the hashed password in the user document
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid  password' });
    }

    // Password is valid, user is authenticated
    console.log('User logged in:', user);

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all user details
const getAllUsers = async (req, res) => {
  try {
    const users = await Userschema.find();
    console.log("All users:", users);
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const user = await Userschema.findById(req.params.id);
    if (user) {
      console.log("User found:", user);
      res.json(user); // Send the user as a JSON response
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Userschema.findByIdAndDelete(req.params.userId);
    if (deletedUser) {
      console.log("User deleted:", deletedUser);
      res.json({ message: "User deleted" });
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await Userschema.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (updatedUser) {
      console.log("User updated:", updatedUser);
      res.json(updatedUser);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 // Add product to cart
 const addToCart = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId

  try {
    // Get the user and product details
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

    // Add the product to the user's cart
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
    const user = await Userschema.findById(req.params.id).populate("wishlist");
    console.log(user);
    if (user) {
      console.log("User found:", user);
      res.json(user.wishlist); // Send the user's wishlist as a JSON response
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Add product to wishlist
const addToWishlist = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  try {
    // Get the user and product details
    const user = await Userschema.findById(userId);
    const product = await Productschema.findById(productId);
console.log(productId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add the product to the user's wishlist
    user. wishlist.push(product);
    await user.save();

    console.log("Product added to wishlist:", product);
    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get wishlist by user ID
const getWishlistByUserId = async (req, res) => {
  try {
    const user = await Userschema.findById(req.params.id).populate("wishlist");
    console.log(user);
    if (user) {
      console.log("User found:", user);
      res.json(user.wishlist); // Send the user's wishlist as a JSON response
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
    // Find the user by ID
    const user = await Userschema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the product in the wishlist array
    const productIndex = user.wishlist.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist array
    user.wishlist.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    console.log("Product removed from wishlist:", productId);
    res.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  Userlogin,
  addToCart,
  getCartByUserId,
  addToWishlist,
 
  getWishlistByUserId,
 deleteFromWishlist 
 
};
