const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./src/routes/userRoute");
const adminRouter = require("./src/routes/adminRoute");
require("dotenv").config();

app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/letestdb", {
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
// app.get('/',(req,res) => {
//   res.send("hii")
// })
