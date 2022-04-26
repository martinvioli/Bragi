import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CreateUser.module.css";

function validate(input) {
  const errors = {};
  if (!input.firstName) {
    errors.firstName = "FirstName is required";
  } else if (!/^[a-z]{3,15}$/.test(input.firstName)) {
    errors.firstName =
      "The FirstName must be an avaliable name with only 3 to 15 lowecase letters.";
  }
  if (!input.lastName) {
    errors.lastName = "LastName is required";
  } else if (!/^[a-z]{3,15}$/.test(input.lastName)) {
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
    setErrors(validate(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario Enviado con Exito");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="firstName">First name:</label>
        <input
          type="firstName"
          name="firstName"
          value={input.firstName}
          onChange={(e) => handleChange(e)}
        />
        {errors.firstName ? (
          <label className={styles.errors} htmlFor="firstName">
            {errors.firstName}
          </label>
        ) : null}
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={input.lastName}
          onChange={(e) => handleChange(e)}
        />
        {errors.lastName ? (
          <label className={styles.errors} htmlFor="lastName">
            {errors.lastName}
          </label>
        ) : null}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        {errors.email ? (
          <label className={styles.errors} htmlFor="email">
            {errors.email}
          </label>
        ) : null}
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          defaultValue="default"
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="default">
            Select...
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        {errors.gender ? (
          <label className={styles.errors} htmlFor="gender">
            {errors.gender}
          </label>
        ) : null}
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          inputMode="tel"
          name="phone"
          value={input.phone}
          onChange={(e) => handleChange(e)}
        />
        {errors.phone ? (
          <label className={styles.errors} htmlFor="phone">
            {errors.phone}
          </label>
        ) : null}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        {errors.password ? (
          <label className={styles.errors} htmlFor="username">
            {errors.password}
          </label>
        ) : null}
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
          <input type="submit" disabled />
        ) : (
          <input type="submit" />
        )}
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}

export default CreateUser;
