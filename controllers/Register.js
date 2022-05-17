const registerEmail = require("../libs/registerEmail");
const { calculateOrderAmount } = require("../libs/calculateOrderAmount");
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(STRIPE_KEY);

function emailRegisterPage(req, res) {
  const body = req.body;
  registerEmail(body.email, body.eventId, body.roleId)
    .then(res.send("email sent"))
    .catch((err) => {
      console.log(err);
    });
}

async function createPaymentIntent(req, res) {
  const items = req.body;
  console.log(calculateOrderAmount(items));
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

const Register = { emailRegisterPage, createPaymentIntent };

module.exports = Register;
