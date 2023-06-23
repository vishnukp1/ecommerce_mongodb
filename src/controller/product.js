const Productschema = require("../models/Productschema");

const createProduct = async (req, res) => {
  const newProduct = await Productschema.create(req.body);
  console.log("Product created:", newProduct);
  res.status(201).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const Products = await Productschema.find();
  console.log("All Products:", Products);
  res.json(Products);
};

const getProductById = async (req, res) => {
  const Product = await Productschema.findById(req.params.id);
  if (Product) {
    console.log("Product found:", Product);
    res.json(Product);
  } else {
    console.log("Product not found");
    res.status(404).json({ error: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const deletedProduct = await Productschema.findByIdAndDelete(req.params.id);
  if (deletedProduct) {
    console.log("Product deleted:", deletedProduct);
    res.json({ message: "Product deleted" });
  } else {
    console.log("Product not found");
    res.status(404).json({ error: "Product not found" });
  }
};

const updateProduct = async (req, res) => {
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
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const products = await Productschema.find({ category });
  console.log("ytytry", category);
  if (products.length > 0) {
    console.log("Products found:", products);
    res.json(products);
  } else {
    console.log("No products found for the category:", category);
    res.status(404).json({ error: "No products found for the category" });
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
