const jwt = require("jsonwebtoken");
const Userschema = require("../models/Userschema");
require("dotenv").config();
const validate = require("../validation/schemaValidate");

const loginAdmin = async (req, res) => {
  const { error, value } = validate.adminValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  const { username, password } = value;
  const usernameenv = process.env.adminUserName;
  const passwordenv = process.env.adminPassword;

  if (username !== usernameenv || password !== passwordenv) {
    return res.send("Username and password do not match"); 
  }    

  const token = jwt.sign({ username: usernameenv }, "admin");
  res.json({
    status: "success",
    token: token,
  });
};

const getAllUsers = async (req, res) => {
  const users = await Userschema.find();

  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await Userschema.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
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





