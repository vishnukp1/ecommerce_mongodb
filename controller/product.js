const Productschema = require("../models/Productschema");
const Userschema = require("../models/Userschema");
const express = require("express");

// Create a new Product detail
const createProduct = async (req, res) => {
  try {
    const newProduct = await Productschema.create(req.body);
    console.log("Product created:", newProduct);
    res.status(201).json(newProduct); // Send the created Product as a JSON response
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all Product details
const getAllProducts = async (req, res) => {
  try {
    const Products = await Productschema.find();
    console.log("All Products:", Products);
    res.json(Products); // Send the Products as a JSON response
  } catch (error) {
    console.error("Error retrieving Products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Product details by ID
const getProductById = async (req, res) => {

  try {
    
    const Product = await Productschema.findById(req.params.ProductId);
    if (Product) {
      console.log("Product found:", Product);
      res.json(Product); // Send the Product as a JSON response
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Productschema.findByIdAndDelete(req.params.ProductId);
    if (deletedProduct) {
      console.log("Product deleted:", deletedProduct);
      res.json({ message: "Product deleted" });
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Productschema.findByIdAndUpdate(
      req.params.ProductId,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      console.log("Product updated:", updatedProduct);
      res.json(updatedProduct);
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get product details by category
const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
  
    try {
      const products = await Productschema.find({ category: category });
      if (products.length > 0) {
        console.log("Products found:", products);
        res.json(products);
      } else {
        console.log("No products found for the category:", category);
        res.status(404).json({ error: "No products found for the category" });
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
 

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
 
};
