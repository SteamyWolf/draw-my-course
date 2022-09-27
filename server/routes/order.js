const router = require("express").Router();
const Order = require("../models/Order");

// GET THE CART FROM USER
router.get("/:userId", (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "There was an error trying to get the cart from the user",
      });
  }
});

// GET ALL ORDERS FROM ALL USERS (ADMIN ONLY)
router.get("/getAll", (req, res) => {
  try {
    const orders = Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "There was an error trying to fetch all of the orders from all users",
      });
  }
});

// POST NEW ORDER
router.post("/add", (req, res) => {
  const order = new Order(req.body);
  try {
    const savedOrder = Order.save(order);
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "There was an issue with saving the order. Please try again or contact the server administrator.",
      });
  }
});

module.exports = router;
