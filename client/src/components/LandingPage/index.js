import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { FaMusic } from "react-icons/fa";
import { IoMdMusicalNotes } from "react-icons/io";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import api from "../../Utils";
import { motion } from "framer-motion/dist/framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "../../redux/actionCreators";
import { validate } from "../../Utils/validateLogin";
import Swal from "sweetalert2";
import NavBar2 from "../NavBar2";

function LandingPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginUrl } = api;

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    if (userToken) {
      navigate("/feed");
    }
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${loginUrl}`, input);
      //Estas son las URLs a cambiar para que funcione el back.
      // console.log(response.code);
      if (response.data.msgE) {
        setInput({
          email: "",
          password: "",
          userName: "",
        });
        Swal.fire({
          title: "Oops...",
          text: response.data.msgE,
          icon: "error",
          cancelButtonText: "Close",
          cancelButtonColor: "#E74C3C ",
          showCancelButton: true,
          showConfirmButton: false,
        });
        return;
      }
      dispatch(getToken(response.data.token));
      window.localStorage.setItem(
        "userCredentials",
        JSON.stringify(response.data.token)
      );
      if (input.email === "BragiSystem@gmail.com") {
        navigate("admin");
      } else {
        navigate("feed");
      }
      setInput({ email: "", password: "" });
    } catch (e) {
      setInput({
        email: "",
        password: "",
        userName: "",
      });
      Swal.fire({
        title: "Oops...",
        text: "That username or email is not linked to an existent account. Please, verify your inputs.",
        icon: "error",
        cancelButtonText: "Close",
        cancelButtonColor: "#E74C3C ",
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  };

  var features = [
    {
      id: 1,
      title: "Keep up to date",
      description: "Know more about your favourite artists on a daily basis!",
    },
    {
      id: 2,
      title: "Bragi Premium",
      description:
        "Access exclusive content from your favorite artists with Bragi Premium",
    },
    {
      id: 3,
      title: "Check out Bragi's top 10's live",
      description:
        "Our top 10 rankings keep you posted about the best songs and artists right now!",
    },
    {
      id: 4,
      title: "Make friends",
      description:
        "Meet, follow and be friends with people who vibe to the same music than you.",
    },
    {
      id: 5,
      title: "Participate",
      description:
        "Comment, like and participate on the latest post from your idols.",
    },
  ];

  return (
    <div className={styles.container}>
      <NavBar2></NavBar2>
      <motion.div
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.scroller}>
          {features.map((e) => (
            <div className={styles.feature}>
              <h1>{e.id}</h1>
              <h2>{e.title}</h2>
              <h5>{e.description}</h5>
            </div>
          ))}
        </div>
        <div className={styles.falseScroller}></div>
        <div className={styles.form}>
          <IoMdMusicalNotes className={styles.logoMusic} />
          {/* <img
            src="https://www.svgrepo.com/show/194008/music.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          ></img> */}
          <Form
            onSubmit={(e) => handleSubmit(e)}
            style={{ marginBottom: "2em" }}
          >
            {/* <FormGroup className="position-relative">
              <Label for="userName">Username</Label>
              <Input
                type="text"
                name="userName"
                value={input.userName}
                onChange={(e) => handleChange(e)}
                invalid={errors.userName ? true : false}
                valid={!errors.userName && input.userName ? true : false}
              />
              {errors.userName ? (
                <FormFeedback tooltip>{errors.userName}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup> */}
            <FormGroup className="position-relative">
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                invalid={errors.email ? true : false}
                valid={!errors.email && input.email ? true : false}
              />
              {errors.email ? (
                <FormFeedback tooltip>{errors.email}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="position-relative">
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                invalid={errors.password ? true : false}
                valid={!errors.password && input.password ? true : false}
              />
              {errors.password ? (
                <FormFeedback tooltip>{errors.password}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
            {errors.email ||
            errors.password ||
            // errors.userName ||
            // !input.userName ||
            !input.email ||
            !input.password ? (
              <Input type="submit" disabled value="Sign in" />
            ) : (
              <Input
                type="submit"
                value="Sign in"
                className="btn-primary btn"
                style={{
                  background: "rgba(1, 1, 1, 0.3)",
                  color: "black",
                  border: "2px solid rgba(1, 1, 1, 0.3)",
                }}
              />
            )}
          </Form>
          <hr></hr>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              block
              outline
              style={{
                marginTop: "2em",
                background: "#dd9202",
                color: "black",
                border: "2px solid #dd9202",
              }}
            >
              Don't have an account? Sign up!
            </Button>
          </Link>
          <Link to="/submitEmail" style={{ textDecoration: "none" }}>
            <Button color="success" block outline style={{ marginTop: "2em" }}>
              Did you forgot your password? Reset it!
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
