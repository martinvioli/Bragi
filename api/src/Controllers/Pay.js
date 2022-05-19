const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51L0ws6ADS8TOvH2dH6rtgDchVYwl2mZ57NkMCKH5DqjC0NBDRiYdfK0DWJsQHlLDHMY1quzwL2e60DMLkBeUvrjq00Jqe3Tw3O"
);

class PayClass {
  constructor() {}

  payment = async (req, res) => {
    try {
      const { id, amount } = req.body;
      if (!id || !amount)
        return res.status(500).json({ error: "All fields are required" });
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        payment_method: id,
        confirm: true, //confirm the payment at the same time
      });
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.raw.message });
    }
  };

  balance = async (req, res) => {
    try {
      await stripe.balance.retrieve(function (error, balance) {
        if (balance && !error) {
          res.status(200).send({ balance });
        }
        if (!balance && error) {
          res.status(400).send({ err });
        }
      });
    } catch (error) {
      return res.send({ error });
    }
  };

  sub = async (req, res) => {
    const { email, payment_method } = req.body;
    try {
      const customer = await stripe.customers.create({
        payment_method: payment_method,
        email: email,
        invoice_settings: {
          default_payment_method: payment_method,
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: "price_1KzxhwE8TxQAl8Y88Ja6t1zo" }],
        expand: ["latest_invoice.payment_intent"],
      });

      const status = subscription["latest_invoice"]; //['payment_intent']//['status'] || "something failed" //['payment_intent']['status'];
      const client_secret = subscription["latest_invoice"]; //['payment_intent']['client_secret'];

      res.status(200).json({ subscription, status });
    } catch (error) {
      return res.json({ message: error.message });
    }
  };
}

module.exports = PayClass;
