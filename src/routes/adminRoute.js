const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
} = require("../controller/product");

cons = require("../middleware/adminAuth");
const router = express.Router();

const {
  loginAdmin,

  getAllUsers,
  getUserById,
  status,
  orders,
} = require("../controller/admin");

const trycatch = require("../middleware/trycatchp");
const userVerify = require("../middleware/userAuth");
const { updateUser, deleteUser } = require("../controller/user");

router.post("/api/admin/login", loginAdmin);

router.delete('/api/delete-user/:id', deleteUser);

router.put('/api/update-user/:id', updateUser);

router.post("/api/admin/products", trycatch(createProduct));

router.get("/api/admin/products", trycatch(getAllProducts));

router.put("/api/admin/products/:id", trycatch(updateProduct));

router.delete("/api/admin/products/:id", trycatch(deleteProduct));

router.get("/api/admin/products/:id", trycatch(getProductById));


router.get(
  "/api/admin/products/category/:category",
  trycatch(getProductsByCategory)
);

router.get("/api/admin/users", trycatch(getAllUsers));

router.get("/api/admin/users/:id", trycatch(getUserById));

router.get("/api/admin/stats", trycatch(status));

router.get("/api/admin/orders", trycatch(orders));

module.exports = router;
