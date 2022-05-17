import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./Payform.module.css";
import axios from "axios";
import { useState } from "react";
import {
  FiDollarSign
} from "react-icons/fi";

const stripePromise = loadStripe(
  "pk_test_51KyQ9pE8TxQAl8Y82fJm1D0MB9ECZTRMoCzivFanYuiJDBbRDAY0ObUh0zKEZ4diN9PeZeJ3D0j3AtF1a3kBJ10H005WnwH2qT"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3001/pay", {
          id: id,
          amount: 99,
          description: "BRAGI - Monthly Suscription",
        });
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* User Card Input */}
      <div className={styles.form}>
        <h2>Insert your card details </h2>
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn" style={{ backgroundColor: "#dd9202"}}>
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function PayForm() {
  return (
    <>
    {/* <div style={{ height: "500px", width: "500px"}}className={styles.payment}>
      <FiDollarSign/>
    </div> */}
      <div className={styles.box}>
        <div className={styles.dollarNLogo}>
          <img style={{ height: "100px", width:"100px", display: "inline-flex" }} src="https://i.imgur.com/4UBgUvv.png" alt="BragiLogo" />
        <div className={styles.dollarSign}>
          <FiDollarSign style={{
            width: "2em",
            height: "2em",
            marginLeft: "300px",
            marginTop: "25px",
            marginBottom: "50px"
            // width: "50%",
            // border: "3px solid green",
            // padding: "10px",
          }}/>
        </div>
        </div>
        <h1>Became Premium</h1>
        <Elements stripe={stripePromise}>
          <div>
            <div>
              <div>
                <CheckoutForm />
              </div>
            </div>
          </div>
        </Elements>
      </div>
    </>
  );
}

export default PayForm;
