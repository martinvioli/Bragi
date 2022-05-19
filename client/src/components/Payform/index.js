import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./Payform.module.css";
import axios from "axios";
import { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { Button, Input } from "reactstrap";
import { getPremiumPlan, getToken, getUser } from "../../redux/actionCreators";
import Swal from "sweetalert2";
import api from "../../Utils";

const stripePromise = loadStripe(
  "pk_test_51L0ws6ADS8TOvH2dlToX4bzaqYWsrLCPsMaFcTxb1mSNGxseAfyAWm3PGR6r2kzc7yWtxV31L5yFbkaYcgzFgIB000OpkIuaOF"
);

//TENGO QUE MANDAR USERNAME, ID PLAN

const CheckoutForm = () => {
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const premiumPlans = useSelector((state) => state.premiumPlans);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    if (userCredentials) {
      const userToken = JSON.parse(userCredentials);
      dispatch(getUser(userToken));
      dispatch(getToken(userToken));
    }
    if (!userCredentials) {
      navigate("/");
    }
    dispatch(getPremiumPlan());
  }, []);

  const plans = premiumPlans;

  const [input, setInput] = useState({ planDetails: null });

  const handleInput = (e) => {
    /// console.log(input);
    if (e.target.value === "default")
      return setInput({ ...input, planDetails: null });
    setInput({ ...input, [e.target.name]: JSON.parse(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: "bragisystem@gmail.com",
      },
    });
    setLoading(true);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post(api.payment, {
          id,
          amount: Number(Number(input.planDetails.priceMembership) * 100),
        });

        elements.getElement(CardElement).clear();
        if (data.message === "Successful Payment") {
          setLoading(false);
          const payAprobe = await axios.post(api.changeUserToPremium, {
            userName: user.userName,
            premiumPlan: input.planDetails.idPlanPremium,
          });
          Swal.fire({
            title: "Success",
            text: "Your payment has been made successfully, thank you!",
            icon: "success",
            showConfirmButton: true,
            confirmButtonColor: "#0d6efd",
            timer: 2000,
          });
          navigate("/feed");
          return;
        } else {
          Swal.fire({
            title: "We were unable to perform your payment 😪",
            text: data.message,
            icon: "error",
            confirmButtonColor: "#dd9202",
          });
          setLoading(false);
        }
      } catch (data) {
        Swal.fire({
          title: "We were unable to perform your payment 😪",
          text: data.message,
          icon: "error",
          confirmButtonColor: "#dd9202",
        });
        setLoading(false);
      }
      setLoading(false);
    } else {
      Swal.fire({
        title: "We were unable to perform your payment 😪",
        text: error,
        icon: "error",
        confirmButtonColor: "#dd9202",
      });
      setLoading(false);
    }
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Form select */}
      <Input
        style={{
          width: "25em",
          height: "3em",
          margin: "2em",
          border: "3px solid #dd9202",
          borderRadius: "8px",
          marginLeft: "200px",
        }}
        type="select"
        defaultValue="default"
        name="planDetails"
        onChange={(e) => handleInput(e)}
      >
        <option value="default">Select a Plan...</option>
        {plans &&
          plans.map((e) => {
            return (
              <option value={JSON.stringify(e)}>{e.namePlanPremium}</option>
            );
          })}
      </Input>

      {input.planDetails && (
        <div className={styles.detail}>
          Months: {input.planDetails.numberOfMonths}
          <br />
          You would pay: ${input.planDetails.priceMembership} USD
        </div>
      )}

      {/* User Card Input */}
      <div className={styles.form}>
        <h2>Insert your card details </h2>
        <CardElement />
      </div>

      <button
        disabled={!stripe}
        className="btn"
        style={{ backgroundColor: "#dd9202" }}
      >
        {loading ? (
          <div style={{ display: "inline-flex" }}>
            <div
              style={{ color: "white", marginRight: "15px", fontSize: "20px" }}
            >
              Loading...
            </div>
            <div className="spinner-border text-light" role="status" />
          </div>
        ) : (
          <p style={{ color: "white", marginBottom: "-2px" }}>Buy</p>
        )}
      </button>
    </form>
  );
};

function PayForm() {
  const navigate = useNavigate();

  const handleOnClickBack = () => {
    navigate("/feed");
  };
  return (
    <>
      {/* <div style={{ height: "500px", width: "500px"}}className={styles.payment}>
      <FiDollarSign/>
    </div> */}
      <div className={styles.box}>
        <div className={styles.dollarNLogo}>
          <img
            style={{ height: "100px", width: "100px", display: "inline-flex" }}
            src="https://i.imgur.com/4UBgUvv.png"
            alt="BragiLogo"
          />
          <div className={styles.dollarSign}>
            <FiDollarSign
              style={{
                width: "2em",
                height: "2em",
                marginLeft: "300px",
                marginTop: "25px",
                marginBottom: "50px",
              }}
            />
          </div>
        </div>
        <h1>Become Premium</h1>
        <Elements stripe={stripePromise}>
          <div>
            <div>
              <div>
                <CheckoutForm />
              </div>
            </div>
          </div>
        </Elements>
        <Button
          style={{ backgroundColor: "#dd9202", marginTop: "30px" }}
          onClick={handleOnClickBack}
        >
          Back
        </Button>
      </div>
    </>
  );
}

export default PayForm;
