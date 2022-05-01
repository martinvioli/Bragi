import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../Utils/validate";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import api from "../../Utils";
import { motion } from "framer-motion/dist/framer-motion";

function CreateUser() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    gender: "",
    tel: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    userName: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    userName: "",
    tel: "",
  });
  let [show, setShow] = useState(false);
  let [show2, setShow2] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  const [disabled, setDisabled] = useState(false);
  const handleDisabled = () => setDisabled(true);
  const [inputToken, setInputToken] = useState({
    code: "",
    token: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { baseUrl } = api;

  const handleShow = () => setShow(!show);
  const handleShow2 = () => setShow2(!show2);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };
  const checkData = async (e) => {
    if (e.target.name === "email") {
      const response = await axios.get(
        `${baseUrl}register/validate?email=${input.email}`
      );
      if (response.data.hasOwnProperty("msgE")) {
        setErrors({ ...errors, email: response.data.msgE });
      }
    } else {
      const response = await axios.get(
        `${baseUrl}register/validate?userName=${input.userName}`
      );
      if (response.data.hasOwnProperty("msgE")) {
        setErrors({ ...errors, userName: response.data.msgE });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${baseUrl}register`, input);
    const userToken = await response.data.token;
    setInputToken({
      ...inputToken,
      token: response.data.token ? response.data.token : "",
    });
    window.localStorage.setItem("userCredentials", JSON.stringify(userToken));
    setInput({
      name: "",
      lastName: "",
      email: "",
      gender: "",
      tel: "",
      password: "",
      repeatPassword: "",
      birthday: "",
      userName: "",
    });
    setShow(false);
    setShow2(false);
  };

  // AUTH THINGS //

  // const getToken = () => {
  //   const userCredentials = window.localStorage.getItem("userCredentials");
  //   const userToken = JSON.parse(userCredentials);
  //   userToken
  //     ? setInputToken({ ...inputToken, token: userToken })
  //     : setInputToken({ ...inputToken, token: "" });
  // };

  const handleChangeAuth = (e) => {
    setInputToken({
      ...inputToken,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickAuth = async (e) => {
    e.preventDefault();
    // getToken();
    try {
      if (inputToken.token && inputToken.code) {
        const response = await axios.post(`${api.authenticateUrl}`, inputToken);
        if (response.data.msg) {
          alert(response.data.msg);
          navigate("/home");
        }
        if (response.data.msgE) {
          alert(response.data.msgE);
        }
        setInputToken({
          code: "",
          token: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.background}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Form
          onSubmit={(e) => {
            handleDisabled();
            handleSubmit(e);
            handleShowModal();
          }}
        >
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
          >
            <Label htmlFor="name">First name:</Label>
            <Input
              type="name"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              invalid={errors.name ? true : false}
              valid={!errors.name && input.name ? true : false}
            />
            {errors.name ? (
              <FormFeedback tooltip>{errors.name}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginLeft: "2%" }}
          >
            <Label htmlFor="lastName">Last name:</Label>
            <Input
              type="text"
              name="lastName"
              value={input.lastName}
              onChange={(e) => handleChange(e)}
              invalid={errors.lastName ? true : false}
              valid={!errors.lastName && input.lastName ? true : false}
            />
            {errors.lastName ? (
              <FormFeedback tooltip>{errors.lastName}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative" style={{ width: "48%" }}>
            <Label htmlFor="userName">Username:</Label>
            <Input
              type="text"
              name="userName"
              value={input.userName}
              onChange={(e) => handleChange(e)}
              invalid={errors.userName ? true : false}
              valid={!errors.userName && input.userName ? true : false}
              onBlur={checkData}
            />
            {errors.userName ? (
              <FormFeedback tooltip>{errors.userName}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
          >
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              invalid={errors.email ? true : false}
              valid={!errors.email && input.email ? true : false}
              onBlur={checkData}
            />
            {errors.email ? (
              <FormFeedback tooltip>{errors.email}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginLeft: "2%" }}
          >
            <Label htmlFor="tel">Tel: </Label>
            <Input
              type="number"
              name="tel"
              value={input.tel}
              onChange={(e) => handleChange(e)}
              invalid={errors.tel ? true : false}
              valid={!errors.tel && input.tel ? true : false}
            />
            {errors.tel ? (
              <FormFeedback tooltip>{errors.tel}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
          >
            <Label htmlFor="gender">Gender:</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="select"
              name="gender"
              value={input.gender}
              invalid={
                errors.gender || input.gender === "default" ? true : false
              }
              valid={!errors.gender && input.gender ? true : false}
            >
              <option value="default">Select ...</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non Binary">No Binary</option>
              <option value="Other">Other</option>
              {errors.gender ? (
                <FormFeedback tooltip>{errors.gender}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </Input>
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginLeft: "2%" }}
          >
            <Label htmlFor="date">Date of Birth:</Label>
            <Input
              type="date"
              name="birthday"
              value={input.birthday}
              onChange={(e) => handleChange(e)}
              invalid={errors.birthday ? true : false}
              valid={!errors.birthday && input.birthday ? true : false}
            />
            {errors.birthday ? (
              <FormFeedback tooltip>{errors.birthday}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
          >
            <Label htmlFor="password">Password:</Label>
            <Input
              type={show ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
              invalid={errors.password ? true : false}
              valid={!errors.password && input.password ? true : false}
              style={{ paddingLeft: "2.5em" }}
            />
            <input
              type="button"
              onClick={handleShow}
              value="👁"
              style={{
                border: "none",
                backgroundColor: "#ffffff00",
                top: "2.4em",
                position: "absolute",
                borderRight: "1px solid rgb(197, 197, 197)",
                display: "inline",
              }}
            />

            {errors.password ? (
              <FormFeedback tooltip>{errors.password}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>

          <FormGroup
            className="position-relative"
            style={{ display: "inline-block", width: "48%", marginLeft: "2%" }}
          >
            <Label htmlFor="repeatPassword">Repeat Password:</Label>
            <Input
              type={show2 ? "text" : "password"}
              name="repeatPassword"
              value={input.repeatPassword}
              onChange={(e) => handleChange(e)}
              invalid={errors.repeatPassword ? true : false}
              valid={
                !errors.repeatPassword && input.repeatPassword ? true : false
              }
              style={{ paddingLeft: "2.5em" }}
            />
            <input
              type="button"
              onClick={handleShow2}
              value="👁"
              style={{
                border: "none",
                backgroundColor: "#ffffff00",
                top: "2.4em",
                position: "absolute",
                borderRight: "1px solid rgb(197, 197, 197)",
                display: "inline",
              }}
            />
            <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
            {errors.repeatPassword ? (
              <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative"></FormGroup>
          <FormGroup className="position-relative"></FormGroup>
          <FormGroup className="position-relative"></FormGroup>
          {errors.name ||
          errors.lastName ||
          errors.gender ||
          errors.tel ||
          errors.email ||
          errors.birthday ||
          errors.password ||
          errors.repeatPassword ||
          errors.userName ||
          !input.name ||
          !input.lastName ||
          !input.tel ||
          !input.userName ||
          !input.gender ||
          !input.email ||
          !input.birthday ||
          !input.password ||
          !input.repeatPassword ? (
            <Input type="submit" disabled value="Send" />
          ) : (
            <Input
              type="submit"
              className="btn-primary btn"
              value="Send"
              disabled={disabled}
            />
          )}
        </Form>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color="primary" style={{ marginTop: "2em" }}>
            Back
          </Button>
        </Link>

        {/* MODAL SECTION */}
        <Modal centered isOpen={showModal}>
          <ModalBody
            className="bg-light rounded-1"
            style={{ textAlign: "center" }}
          >
            <h2 className={styles.subtitle}>
              Thanks you for your registration on
              <p className={"text-primary"}>BRAGI</p> <br />
              Please check your email and put your code here
            </h2>
            <p className={styles.text}>
              If you can't find this code, be sure to check your spam.
            </p>
            <FormGroup className="position-relative">
              <Label htmlFor="code">CODE</Label>
              <Input
                type="text"
                name="code"
                value={inputToken.code}
                onChange={(e) => handleChangeAuth(e)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="bg-light rounded-1">
            <Button color="primary" onClick={handleClickAuth}>
              Send
            </Button>
          </ModalFooter>
        </Modal>
      </motion.div>
    </div>
  );
}

export default CreateUser;
