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
            confirm: true,
          });
        
          console.log(payment);
        
          return res
            .status(200)
            .json({ message: "Successful Payment", data: payment });
        } catch (error) {
          console.log(error);
          return res.json({ message: error.message });
        }

    }
}

module.exports = PayClass;