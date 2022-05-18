const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51KyQ9pE8TxQAl8Y8ukGWushgskKk4y9FlZivJJPn22Kw9pZwfPNvrtAWcrV7FsAnrSagUUZgDEDXgPftkRzxSCvM00V5e32DGq"
);


class PayClass {
    constructor(){}

    payment = async (req, res) => {
      try {
        const { id, amount, description } = req.body;
        console.log("linea 12", id, amount, description);
        if (!id || !amount || !description)
          return res.status(500).json({ error: "All fields are required" });
        const payment = await stripe.paymentIntents.create({
          amount: amount,
          currency: "USD",
          description: description,
          payment_method: id,
          confirm: true, //confirm the payment at the same time
        });
    
        console.log(payment);
    
        return res
          .status(200)
          .json({ message: "Successful Payment", data: payment });
      } catch (error) {
        console.log(error);
        return res.json({ message: error.message });
      }

    };

    sub = async = (req, res) => {
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

        res.json({
          hola: subscription,
        });
      } catch (error) {
          return res.json({ message: error.message });
        }
    }
}

module.exports = PayClass;
