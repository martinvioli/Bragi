import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  FormFeedbackProps,
  Button,
} from "reactstrap";

function underAgeValidate(birthday) {
  const reverseBirthday = birthday.split("/").reverse().join("/");

  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
  var optimizedBirthday = reverseBirthday.replace(/-/g, "/");

  //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
  var myBirthday = new Date(optimizedBirthday);

  // set current day on 01:00:00 hours GMT+0100 (CET)
  var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";

  // calculate age comparing current date
  var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

  if (myAge < 18) {
    return false;
  } else {
    return true;
  }
}

function validate(input) {
  const errors = {};
  if (!input.firstName) {
    errors.firstName = "FirstName is required";
  } else if (!/^[a-zA-Z_-]{3,15}$/.test(input.firstName)) {
    errors.firstName =
      "The FirstName must be an valid name with only 3 to 15 lowecase letters.";
  }
  if (!input.lastName) {
    errors.lastName = "LastName is required";
  } else if (!/^[a-zA-Z_-]{3,15}$/.test(input.lastName)) {
    errors.lastName =
      "The LastName must be an valid name with only 3 to 15 lowecase letters.";
  }
  if (!input.email) {
    errors.email = "Email is required";
  } else if (
    !/[a-z0-9]+(.[_a-z0-9]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,15})/i.test(
      input.email
    )
  ) {
    errors.email = "Email is invalid";
  }
  if (!input.phone) {
    errors.phone = "Phone is required";
  } else if (
    !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(input.phone)
  ) {
    errors.phone = "Phone is invalid";
  }
  if (!input.gender) {
    errors.gender = "Gender is required";
  }
  if (!input.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(input.password)
  ) {
    errors.password = "Password is invalid";
  }
  if (!input.username) {
    errors.username = "Username is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(input.username)
  ) {
    errors.username = "Username is invalid";
  }
  if (!input.birthday) {
    errors.birthday = "Birthday is required";
  } else if (!underAgeValidate(input.birthday)) {
    errors.birthday = "You need to be 18 or older.";
  }

  if (!input.repeatPassword) {
    errors.repeatPassword = "Password is required";
  } else if (input.repeatPassword !== input.password) {
    errors.repeatPassword = "Passwords not match";
  }
  return errors;
}

function CreateUser() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    username: "",
    phone: "",
  });
  let [show, setShow] = useState(false);
  let [show2, setShow2] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => setShow(!show);
  const handleShow2 = () => setShow2(!show2);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario Enviado con Exito");
    navigate("authenticate");
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phone: "",
      password: "",
      repeatPassword: "",
      birthday: "",
      username: "",
    });
    setShow(false);
    setShow2(false);
  };

  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <FormGroup className="position-relative">
            <Label htmlFor="firstName">First name:</Label>
            <Input
              type="firstName"
              name="firstName"
              value={input.firstName}
              onChange={(e) => handleChange(e)}
              invalid={errors.firstName ? true : false}
              valid={!errors.firstName && input.firstName ? true : false}
            />
            {errors.firstName ? (
              <FormFeedback tooltip>{errors.firstName}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative">
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
          <FormGroup className="position-relative">
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={(e) => handleChange(e)}
              invalid={errors.username ? true : false}
              valid={!errors.username && input.username ? true : false}
            />
            {errors.username ? (
              <FormFeedback tooltip>{errors.username}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative">
            <Label htmlFor="email">Email:</Label>
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
            <Label htmlFor="gender">Gender:</Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="select"
              name="gender"
              value={input.gender}
              invalid={errors.gender ? true : false}
              valid={!errors.gender && input.gender ? true : false}
              defaultValue="default"
            >
              <option value="default">Select ...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="noBinary">No Binary</option>
              <option value="other">Other</option>
              {errors.gender ? (
                <FormFeedback tooltip>{errors.gender}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </Input>
          </FormGroup>
          <FormGroup className="position-relative">
            <Label htmlFor="date">Birthday:</Label>
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
          <FormGroup className="position-relative">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={input.phone}
              onChange={(e) => handleChange(e)}
              invalid={errors.phone ? true : false}
              valid={!errors.phone && input.phone ? true : false}
            />
            {errors.phone ? (
              <FormFeedback tooltip>{errors.phone}</FormFeedback>
            ) : (
              <FormFeedback tooltip></FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative">
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

          <FormGroup className="position-relative">
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
          {errors.firstName ||
          errors.lastName ||
          errors.gender ||
          errors.phone ||
          errors.email ||
          errors.password ||
          errors.repeatPassword ||
          !input.firstName ||
          !input.lastName ||
          !input.phone ||
          !input.gender ||
          !input.email ||
          !input.password ||
          !input.repeatPassword ? (
            <Input type="submit" disabled value="Send" />
          ) : (
            <Input type="submit" className="btn-primary btn" value="Send" />
          )}
        </Form>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color="primary" style={{ marginTop: "2em" }}>
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

export default CreateUser;
