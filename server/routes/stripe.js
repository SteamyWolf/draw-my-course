const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51LmUMqCA2mhT4AVStV8hMsuNDXq8WzbSpuZksD3Jd2tiVQNYNsHFhj01hHTx5MMz1QHl24z2mAbdBxWQ8rCVArdX00VxzxuCOY"
);

router.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "required",
      line_items: req.body.product_data_array,
      mode: "payment",
      success_url:
        "http://localhost:56211/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:56211",
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
  console.log(req.query.session_id);
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
