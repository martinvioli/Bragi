import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CreateUser.module.css";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  FormFeedbackProps,
} from "reactstrap";

function validate(input) {
  const errors = {};
  if (!input.firstName) {
    errors.firstName = "FirstName is required";
  } else if (!/^[a-z ,.'-]+$/i.test(input.firstName)) {
    errors.firstName =
      "The FirstName must be an avaliable name with only 3 to 15 lowecase letters.";
  }
  if (!input.lastName) {
    errors.lastName = "LastName is required";
  } else if (!/^[a-z ,.'-]+$/i.test(input.lastName)) {
    errors.lastName =
      "The LastName must be an avaliable name with only 3 to 15 lowecase letters.";
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
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = "Password is invalid";
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
  });
  const [errors, setErrors] = useState({
    email: "",
    gender: "",
    phone: "",
    password: "",
  });

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
            />
            {errors.firstName && (
              <FormFeedback tooltip>{errors.firstName}</FormFeedback>
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
            />
            {errors.lastName && (
              <FormFeedback tooltip>{errors.lastName}</FormFeedback>
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
            />
            {errors.email && (
              <FormFeedback tooltip>{errors.email}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative">
            <Label htmlFor="gender">Gender: </Label>
            <Input
              onChange={(e) => handleChange(e)}
              type="select"
              name="gender"
              value={input.gender}
              invalid={errors.gender ? true : false}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="noBinary">No Binary</option>
              <option value="other">Other</option>
              {errors.gender && (
                <FormFeedback tooltip>{errors.gender}</FormFeedback>
              )}
            </Input>
          </FormGroup>
          <FormGroup className="position-relative">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={input.phone}
              onChange={(e) => handleChange(e)}
              invalid={errors.phone ? true : false}
            />
            {errors.phone && (
              <FormFeedback tooltip>{errors.phone}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="position-relative">
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
              invalid={errors.password ? true : false}
            />
            {errors.password && (
              <FormFeedback tooltip>{errors.password}</FormFeedback>
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
          !input.firstName ||
          !input.lastName ||
          !input.phone ||
          !input.gender ||
          !input.email ||
          !input.password ? (
            <Input type="submit" disabled />
          ) : (
            <Input type="submit" />
          )}
        </Form>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </>
  );
}

export default CreateUser;
