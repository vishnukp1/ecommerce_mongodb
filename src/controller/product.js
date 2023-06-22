const Productschema = require("../models/Productschema");
const Userschema = require("../models/Userschema");


const createProduct = async (req, res) => {
  try {
    const newProduct = await Productschema.create(req.body);
    console.log("Product created:", newProduct);
    res.status(201).json(newProduct); 
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const Products = await Productschema.find();
    console.log("All Products:", Products);
    res.json(Products); 
  } catch (error) {
    console.error("Error retrieving Products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {

  try {
    
    const Product = await Productschema.findById(req.params.id);
    if (Product) {
      console.log("Product found:", Product);
      res.json(Product); 
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Productschema.findByIdAndDelete(req.params.id);
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

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Productschema.findByIdAndUpdate(
      req.params.id,
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


const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
  
    try {
      const products = await Productschema.find({ category });
      console.log("ytytry",category);
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
