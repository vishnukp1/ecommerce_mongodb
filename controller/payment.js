const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/Userschema");
const YOUR_STRIPE_SECRET_KEY = "sk_test_51NKwjVSAHM5GHrojQTr76No69rjNz4szOULqUHJilPU3K7NUsK82t7aGJGyI8cXbOJVWpy3p1mD0GyItjMVr37w400TCn8Azmu";
const stripe = require("stripe")(YOUR_STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.json({
        status: "failure",
        message: "Please log in"
      });
    }

    if (user.cart.length === 0) {
      return res.json({
        message: "User cart is empty, please add some products"
      });
    }

    let totalSum = user.cart.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    if (isNaN(totalSum)) {
      return res.json({
        status: "failure",
        message: "Invalid total sum"
      });
    }

    let metadata = "Thank you for purchasing from us, see you soon";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Sample Product',
              description: 'This is a sample product',
              images: ['https://example.com/product-image.jpg'],
            },
            unit_amount: totalSum * 100, // Amount in rupees
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
      cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
      metadata: {
        script: metadata,
      },
    });

    res.json({ paymentUrl: session.url, paymentId: session.id });

    user.orders.push({
      productsCount: user.cart.length,
      orderId: session.id,
      totalAmount: totalSum
    });
    await user.save();
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/process-payment/:id", payment);

module.exports = router;
