const Userschema = require("../models/Userschema");
const Productschema = require("../models/Productschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Userschema");
const { default: Stripe } = require("stripe");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const validate = require("../validation/schemaValidate");
const userRegister = async (req, res) => {
  const { error, value } = validate.userValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, password, name, email } = value;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Userschema({
    username: username,
    password: hashedPassword,
    name: name,
    email: email,
  });

  try {
    await user.save();
    res.json({ message: "User account registered successfully", user });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).json({
      status: "failure",
      message: "something went wrong",
      error_message: err.message,
    });
  }
};

const userlogin = async (req, res) => {
  const { error, value } = validate.userValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, password } = value;

  try {
    const user = await Userschema.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ username: user.username }, "user");

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).json({
      status: "failure",
      message: "something went wrong",
      error_message: err.message,
    });
  }
};


const addToCart = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  const user = await Userschema.findById(userId);
  const product = await Productschema.findById(productId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }

  user.cart.push(product);
  await user.save();

  res.json({ message: "Product added to cart" });
};

const getCartByUserId = async (req, res) => {
  const user = await Userschema.findById(req.params.id).populate("cart");

  if (user) {
    res.json(user.cart);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

const addToWishlist = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  const user = await Userschema.findById(userId);
  const product = await Productschema.findById(productId);
  console.log(productId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }

  user.wishlist.push(product);
  await user.save();

 
  res.json({ message: "Product added to wishlist" });
};

const getWishlistByUserId = async (req, res) => {
  const user = await Userschema.findById(req.params.id).populate("wishlist");

  if (user) {
    res.json(user.wishlist);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

const deleteFromWishlist = async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  const user = await Userschema.findById(userId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  const productIndex = user.wishlist.findIndex(
    (product) => product._id.toString() === productId
  );

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found in wishlist" });
  }

  user.wishlist.splice(productIndex, 1);

  await user.save();


  res.json({ message: "Product removed from wishlist" });
};

const payment = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("cart");

  if (!user) {
    res.json({
      status: "failure",
      message: "Please log in",
    });
  }

  if (user.cart.length === 0) {
    res.json({
      message: "User cart is empty, please add some products",
    });
  }
  console.log(user.cart);

  let totalSum = user.cart.reduce((sum, item) => {
   return sum + item.price;
  }, 0);
  console.log(totalSum);

  if (isNaN(totalSum)) {

    res.json({
      status: "failure",
      message: "Invalid total sum",
    });
  }

  let metadata = "Thank you for purchasing from us, see you soon";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Sample Product",
            description: "This is a sample product",
            images: ["https://example.com/product-image.jpg"],
          },
          unit_amount: totalSum * 100, // Amount in rupees
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png",
    cancel_url:
      "https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q",
    metadata: {
      script: metadata,
    },
  });

  res.json({ paymentUrl: session.url, paymentId: session.id });

  user.orders.push({
    products: user.cart.length,
    orderId: session.id,
    totalAmount: totalSum,
  });
  user.cart = [];
  await user.save();
};

module.exports = {
  userRegister,
  userlogin,
  addToCart,
  getCartByUserId,
  addToWishlist,
  getWishlistByUserId,
  deleteFromWishlist,
  payment,
};
