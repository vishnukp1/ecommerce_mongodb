const {
  userRegister,
  userlogin,
  addToWishlist,
  addToCart,
  getWishlistByUserId,
  getCartByUserId,
  deleteFromWishlist,
  payment,
} = require("../controller/user");
const userVerify = require("../middleware/userAuth");
const {
  getProductsByCategory,
  getAllProducts,
  getProductById,
} = require("../controller/product");

const trycatch = require("../middleware/trycatchp");

const express = require("express");

const router = express.Router();

router.post("/api/users/login", trycatch(userlogin));

router.post("/api/users/register", trycatch(userRegister));

router.get("/api/users/products", userVerify, trycatch(getAllProducts));

router.get("/api/users/products/:id", userVerify, trycatch(getProductById));

router.get(
  "/api/products/category/:category",
  userVerify,
  trycatch(getProductsByCategory)
); 

router.get("/api/users/:id/cart", userVerify, trycatch(getCartByUserId));

router.post("/api/users/:id/cart", userVerify, trycatch(addToCart));

router.post("/api/users/:id/wishlists", userVerify, trycatch(addToWishlist));

router.get(
  "/api/users/:id/wishlists",
  userVerify,
  trycatch(getWishlistByUserId)
);

router.delete(
  "/api/users/:id/wishlists",
  userVerify,
  trycatch(deleteFromWishlist)
);

router.post("/api/payment/:id", userVerify, trycatch(payment));

module.exports = router;
