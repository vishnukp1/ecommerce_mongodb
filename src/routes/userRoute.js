const {
 
  userRegister,
  userlogin,
  addToWishlist,
  addToCart,
  getWishlistByUserId,
  getCartByUserId,
  deleteFromWishlist,
  payment

} = require("../controller/user");
const userVerify=require("../middleware/userAuth")
const { getProductsByCategory ,getAllProducts,getProductById,} = require("../controller/product");

const express = require("express");

const router = express.Router();

router.post("/api/users/login", userlogin);

router.post("/api/users/register", userRegister);

router.get("/api/users/products",userVerify, getAllProducts);

router.get("/api/users/products/:id",userVerify, getProductById);

router.get("/api/products/category/:category",userVerify, getProductsByCategory);

router.get("/api/users/:id/cart",userVerify, getCartByUserId);

router.post("/api/users/:id/cart",userVerify, addToCart);

router.post("/api/users/:id/wishlists",userVerify, addToWishlist);

router.get("/api/users/:id/wishlists",userVerify, getWishlistByUserId);

router.delete("/api/users/:id/wishlists",userVerify, deleteFromWishlist);


router.post("/api/payment/:id",userVerify, payment);

module.exports = router;
