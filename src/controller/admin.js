const adminschema = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Userschema = require("../models/Userschema");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  const usernameenv = process.env.adminUserName;
  const passwordenv= process.env.adminPassword;
   const adminUserName = req.body.username;
  const adminPassword = req.body.password;

  if (usernameenv !== adminUserName || passwordenv !== adminPassword) {
    return res.send("username and password not match");
  }
  const token = jwt.sign({ username: usernameenv }, "vishnu");
  res.json({
    status: "You successfully token created",
    token: token
  });
};

const getAllUsers = async (req, res) => {
  const users = await Userschema.find();
  console.log("All users:", users);
  res.json(users);
};


const getUserById = async (req, res) => {
  const user = await Userschema.findById(req.params.id);

  if (user) {
    console.log("user found");
    res.json(user);
  } else {
    console.log("User not found");
    res.status(404).json({ error: "User not found" });
  }
};

const status = async (req, res) => {
  const result = await Userschema.aggregate([
    {
      $project: {
        _id: 0,
        totalAmounts: "$orders.totalAmount",
      },
    },
    {
      $unwind: "$totalAmounts",
    },
    {
      $group: {
        _id: null,
        totalitems: { $push: "$totalAmounts" },
        totalRevenue: { $sum: "$totalAmounts" },
      },
    },
  ]);

  const totalAmountsArray = result[0].totalitems.length;
  const totalRevenueGenerated = result[0].totalRevenue;

  console.log("Total items purchased:", totalAmountsArray);
  console.log("Total revenue generated:", totalRevenueGenerated);

  res.json({
    "Total products purchased": totalAmountsArray,
    "Total revenue generated": totalRevenueGenerated,
  });
};

const orders = async (req, res) => {
  const result = await Userschema.aggregate([
    {
      $project: {
        _id: 0,
        orders: "$orders",
      },
    },
    {
      $group: {
        _id: null,
        aggregatedOrders: { $push: "$orders" },
      },
    },
  ]);

  const aggregatedOrders = result[0].aggregatedOrders;

  const filteredOrders = aggregatedOrders.filter((order) => order.length > 0);

  console.log("Order details:", filteredOrders);

  res.json({
    orders: filteredOrders,
  });
};
module.exports = {
  loginAdmin,
  getAllUsers,
  getUserById,
  status,
  orders,
};
