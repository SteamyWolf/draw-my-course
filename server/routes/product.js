const router = require("express").Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "There was an error when trying to get the products. Plese try again.",
    });
  }
});

// POST A NEW PRODUCT (ADMIN ONLY)
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an issue saving your product. Please try again",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.body);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "There was an issue when trying to delete a product. Please try again",
    });
  }
});

module.exports = router;
