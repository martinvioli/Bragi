import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import { url } from "../../Utils";
import { motion } from "framer-motion/dist/framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actionCreators";
import { validate } from "../../Utils/validateLogin";

function LandingPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}`, input);
    if (response.data.msgE) {
      alert(response.data.msgE);
      return;
    }
    const userLogin = response.data.user;

    // dispatch(userLogin);
    window.localStorage.setItem("userCredentials", JSON.stringify(userLogin));
    navigate("home");
    setInput("");
    alert("Todo correcto");
  };

  var features = [
    {
      id: 1,
      title: "Keep up to date",
      description:
        "Know everything about your favourite music bands and singers.",
    },
    {
      id: 2,
      title: "Be part of a fangroup",
      description: "Make it or be part of one if it doesn't already exists.",
    },
    {
      id: 3,
      title: "Never miss a concert again",
      description:
        "Our system will notify you when a band/singer post a new date.",
    },
    {
      id: 4,
      title: "Make friends",
      description: "Meet people who also like the same music you do.",
    },
    {
      id: 5,
      title: "Participate",
      description:
        "Comment and like every new post, and share it with your friends.",
    },
  ];

  return (
    <div className={styles.container}>
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
          <img
            src="https://www.svgrepo.com/show/194008/music.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          ></img>
          <Form
            onSubmit={(e) => handleSubmit(e)}
            style={{ marginBottom: "2em" }}
          >
            <FormGroup className="position-relative">
              <Label for="email">Username</Label>
              <Input
                type="text"
                name="userName"
                value={input.userName}
                onChange={(e) => handleChange(e)}
                invalid={errors.userName ? true : false}
                valid={!errors.userName && input.userName ? true : false}
              />
              {errors.email ? (
                <FormFeedback tooltip>{errors.email}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
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
            errors.userName ||
            !input.userName ||
            !input.email ||
            !input.password ? (
              <Input type="submit" disabled value="Sign in" />
            ) : (
              <Input
                type="submit"
                value="Sign in"
                className="btn-primary btn"
              />
            )}
          </Form>
          <hr></hr>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button color="success" block outline style={{ marginTop: "2em" }}>
              Don't have an account? Sign up!
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
