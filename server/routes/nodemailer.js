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
    subject: `New order placed from DrawMyCourse. Name: ${req.body.customer_name}`,
    html: `
      <p>A new order has been made. See the customer details to know who to send it to and how to contact them. You will need to log into stripe to see what the customer actually ordered. Use the information below to help.</p>
      <h2>Customer Information</h2>
      <ul>
        <li>Name: ${req.body.customer_name}</li>
        <li>Email: ${req.body.customer_email}</li>
        <li>
          Address:
          <address>
            ${req.body.customer_address.line1} ${
      req.body.customer_address.line2 ? req.body.customer_address.line2 : ""
    }<br/>
            ${req.body.customer_address.city}, ${
      req.body.customer_address.state
    } ${req.body.customer_address.postal_code}<br/>
            ${req.body.customer_address.country} <br/>
            ${
              req.body.customer_address.phone
                ? req.body.customer_address.phone
                : ""
            }
          </address>
        </li>
      </ul>
    `,
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
