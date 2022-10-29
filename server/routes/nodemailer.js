const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "drawmycourse@outlook.com",
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/nodemailer/successful-payment", async (req, res) => {
  const options = {
    from: "drawmycourse@outlook.com",
    to: "wyatthunterallan@gmail.com",
    subject: "New order placed from DrawMyCourse",
    text: "A new order has been made. See the customer details to know who to send it to and how to contact them.",
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      res
        .status(500)
        .json({ message: "There was an issue sending the email", error: err });
      return;
    }
    res.status(200).json(info.response);
  });
});

module.exports = router;
