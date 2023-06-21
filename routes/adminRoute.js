const express = require("express")
const {createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    getProductsByCategory, }=require("../controller/product")

    const adminVerify=require("../middleware/adminAuth")
const router = express.Router()

const {loginAdmin,adminRegister,getAllUsers,
    getUserById} = require("../controller/admin")

router.post("/api/admin/register",adminRegister);

router.post("/api/admin/login",loginAdmin)

router.post("/api/admin/products",adminVerify, createProduct);

router.get("/api/admin/products",adminVerify, getAllProducts);

router.put("/api/admin/products/:id",adminVerify, updateProduct);

router.delete("/api/admin/products/:id",adminVerify, deleteProduct);

router.get("/api/admin/products/:id",adminVerify, getProductById);

router.get("/api/admin/products/category/:category",adminVerify, getProductsByCategory);

router.get("/api/admin/users",adminVerify, getAllUsers);

router.get("/api/admin/users/:id",adminVerify, getUserById);


module.exports = router