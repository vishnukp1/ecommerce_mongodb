const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  addToCart,
  addToWishlist
} = require("../controller/product");

// Create a new Product
router.post('/products', createProduct);

// Get all Products
router.get('/products', getAllProducts);

// Get Products by category
router.get('/products/category/:category', getProductsByCategory);

// Get Product by ID
router.get('/products/:id', getProductById);

// Delete Product by ID
router.delete('/products/:id', deleteProduct);

// Update Product by ID
router.put('/products/:id', updateProduct);



module.exports = router;
