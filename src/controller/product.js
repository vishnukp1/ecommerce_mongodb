const Productschema = require("../models/Productschema");

const createProduct = async (req, res) => {
  const { title, description, price, image, category } = req.body;
  const newProduct = await Productschema.create({ title, description, price, image, category });

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

const getAllProducts = async (req, res) => {
  const Products = await Productschema.find();
  res.json({
    status: "success",
    
    data: Products,
  });
}; 

const getProductById = async (req, res) => {
  const Product = await Productschema.findById(req.params.id);
  if (Product) {
    res.json(Product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const deletedProduct = await Productschema.findByIdAndDelete(req.params.id);
  if (deletedProduct) {
    res.json({ message: "Product deleted" });
  } else {
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
    res.status(404).json({ error: "Product not found" });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const products = await Productschema.find({ category });

  if (products.length > 0) {
    res.json(products);
  } else {
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
