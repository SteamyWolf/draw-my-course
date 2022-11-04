const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const nodemailerRoute = require("./routes/nodemailer");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/mail", nodemailerRoute);

mongoose
  .connect(process.env.MONGO_URL, { dbName: "draw-my-course" })
  .then(() => {
    console.log("DB Connection Successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
