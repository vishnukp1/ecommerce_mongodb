const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
} = require("../controller/product");

const adminVerify = require("../middleware/adminAuth");
const router = express.Router();

const {
  loginAdmin,

  getAllUsers,
  getUserById,
  status,
  orders,
} = require("../controller/admin");

const trycatch = require("../middleware/trycatchp");

router.post("/api/admin/login", loginAdmin);

router.post("/api/admin/products", adminVerify, trycatch(createProduct));

router.get("/api/admin/products", adminVerify, trycatch(getAllProducts));

router.put("/api/admin/products/:id", adminVerify, trycatch(updateProduct));

router.delete("/api/admin/products/:id", adminVerify, trycatch(deleteProduct));

router.get("/api/admin/products/:id", adminVerify, trycatch(getProductById));

router.get(
  "/api/admin/products/category/:category",
  adminVerify,
  trycatch(getProductsByCategory)
);

router.get("/api/admin/users", adminVerify, trycatch(getAllUsers));

router.get("/api/admin/users/:id", adminVerify, trycatch(getUserById));

router.get("/api/admin/stats", adminVerify, trycatch(status));
router.get("/api/admin/orders", adminVerify, trycatch(orders));

module.exports = router;
