const router = require("express").Router();
const stripe = require("stripe")(
  process.env.NODE_ENV
    ? process.env.STRIPE_PRODUCTION_KEY
    : process.env.STRIPE_KEY
);

router.post("/payment", async (req, res) => {
  let successURL;
  let cancelURL;
  if (process.env.NODE_ENV) {
    successURL =
      "https://www.drawmycourse.com/success?session_id={CHECKOUT_SESSION_ID}";
    cancelURL = "https://www.drawmycourse.com";
  } else {
    successURL =
      "http://localhost:56211/success?session_id={CHECKOUT_SESSION_ID}";
    cancelURL = "http://localhost:56211";
  }
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "required",
      line_items: req.body.product_data_array,
      mode: "payment",
      success_url: successURL,
      cancel_url: cancelURL,
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: "There was an issue creating your checkout session",
      error,
    });
  }
});

router.post("/payment/success", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: "There was an issue with getting the customer information",
      error,
    });
  }
});

module.exports = router;
