const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors= require("cors")
const morgan = require("morgan")
const userRouter = require("./src/routes/userRoute");
const adminRouter = require("./src/routes/adminRoute");
require("dotenv").config();

//vishnutoanother 
//TJY72CMzB5zAq3ZE 
app.use(morgan())
app.use(cors())  
app.use(express.json());
// mongodb://127.0.0.1:27017/productCart
// mongodb+srv://vishnutoanother:TJY72CMzB5zAq3ZE@cluster0.00v8gqd.mongodb.net/
mongoose

  .connect("mongodb+srv://newuser2000:test1234@cluster0.00v8gqd.mongodb.net/", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/", userRouter);

app.use("/", adminRouter);

app.listen(3002, () => {
  console.log("Server is running on port 3001");
});

