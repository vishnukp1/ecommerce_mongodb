const { updateUser, deleteUser, getUserById, getAllUsers, createUser, Userlogin, addToWishlist, addToCart, getWishlistByUserId,
    getCartByUserId,deleteFromWishlist } = require("../controller/user");
const express=require("express")
const router = express.Router();

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users',getAllUsers )

// Get user by ID
router.get('/users/:id',getUserById );
// User login
router.post('/login',Userlogin );
// Delete user by ID
router.delete('/users/:id',deleteUser);

// Update user by ID
router.put('/users/:id',updateUser);

// Add Product to Cart
router.post('/users/:id/cart', addToCart);

router.get('/users/:id/cart',  getCartByUserId);
// Add Product to Wishlist
router.post('/users/:id/wishlist', addToWishlist);

router.get('/users/:id/wishlist', getWishlistByUserId);

router.delete('/users/:id/wishlist', deleteFromWishlist);

module.exports = router;
