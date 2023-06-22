const adminschema = require("../models/adminSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Userschema=require("../models/Userschema")

  const adminRegister = async (req, res) => {
    try {
      const { username, password, name, email } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = new adminschema({
        username: username,
        password: hashedPassword,
        name: name,
        email: email
      });
  
      await admin.save();
  
      res.json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while registering the admin account' });
    }
  };
  


const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await adminschema.findOne({  username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ username: admin.username }, 'secretkey');

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while logging in' });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await Userschema.find();
    console.log("All users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
   
    const user = await Userschema.findById(req.params.id);
 
    if (user) {
      console.log("user found");
      res.json(user);
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Route to handle the aggregation
const status= async (req, res) => {
  try {
    const result = await Userschema.aggregate([
      {
        $project: {
          _id: 0,
          totalAmounts: "$orders.totalAmount",
     
        }
      },
      {
        $unwind: "$totalAmounts"
      },
      {
        $group: {
          _id: null,
          totalAmounts: { $push: "$totalAmounts" },
          totalRevenue: { $sum: "$totalAmounts" },
    
        }
      }
    ]);

    const totalAmountsArray = result[0].totalAmounts.length;
    const totalRevenueGenerated = result[0].totalRevenue;
    
    console.log("Total items purchased:", totalAmountsArray);
    console.log("Total revenue generated:", totalRevenueGenerated);
  

    res.json({
      "Total products purchased": totalAmountsArray,
     "Total revenue generated": totalRevenueGenerated,
     
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Route to handle the aggregation
const orders = async (req, res) => {
  try {
    const result = await Userschema.aggregate([
      {
        $project: {
          _id: 0,
          orders: "$orders"
        }
      },
      {
        $group: {
          _id: null,
          aggregatedOrders: { $push: "$orders" }
        }
      }
    ]);

    const aggregatedOrders = result[0].aggregatedOrders;

    // Filter out empty arrays from the aggregatedOrders
    const filteredOrders = aggregatedOrders.filter(order => order.length > 0);

    console.log("Order details:", filteredOrders);

    res.json({
      orders: filteredOrders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};


module.exports = {
    loginAdmin,
    adminRegister,
    getAllUsers,
    getUserById,
    status,
    orders
  };
  