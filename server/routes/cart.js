const router = require("express").Router();
const Cart = require("../models/Cart");

// GET the cart associated with the user
router.get("/:cartId", async (req, res) => {
  try {
    const userCart = await Cart.findById(req.params.cartId);
    res.status(200).json(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error retrieving your cart. Please try again.",
    });
  }
});

// POST NEW CART AND SAVE IT (maybe with JWT as userId and when the user clicks add to cart for the first time)
router.post("/add", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "There was an error when trying to add a cart. Please try again.",
    });
  }
});

// PUT/ADD PRODUCT TO CART
router.put("/addProduct/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    cart.products.push(req.body);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "There was an error trying to add that product to the cart. Please try again.",
    });
  }
});

// DELETE (ADMIN ONLY)
router.delete("/deleteCart/:userId", (req, res) => {
  try {
    const cart = Cart.findByIdAndDelete(req.params.userId);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was an error trying to delete the cart." });
  }
});

// GET ALL CARTS (ADMIN ONLY)
router.get("/allCarts", (req, res) => {
  try {
    const carts = Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "There was an issue with trying to fetch all of the carts.",
      });
  }
});

module.exports = router;
