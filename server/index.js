const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL, { dbName: "draw-my-course" })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
