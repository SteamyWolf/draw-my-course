const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51LmUMqCA2mhT4AVStV8hMsuNDXq8WzbSpuZksD3Jd2tiVQNYNsHFhj01hHTx5MMz1QHl24z2mAbdBxWQ8rCVArdX00VxzxuCOY"
);

router.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: req.body.name,
            },
            unit_amount: req.body.amount,
          },
          quantity: req.body.quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:62298/success",
      cancel_url: "http://localhost:62298",
    });
    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({
      message: "There was an issue creating your checkout session",
      error,
    });
  }
});

module.exports = router;
