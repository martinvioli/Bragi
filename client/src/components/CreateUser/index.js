import React from "react";
import { useState } from "react";

function validate(input) {
  const errors = {}; // un  objeto que contenga el error
  if (!input.email) {
    // sino hay nada en username, agregar propiedad al objeto
    errors.email = "Email is required";
    // se compara la regular expression con el input de username
  } else if (
    !/[a-z0-9]+(.[_a-z0-9]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,15})/i.test(
      input.email
    )
  ) {
    // si lo que está escrito es distinto a lo esperado (mail),
    // agregar una propiedad al objeto vacío
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
    // sino hay nada en password, agregar propiedad al objeto
    errors.password = "Password is required";
    // se compara la regular expression con el input de password
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    // si lo que está escrito es distinto a lo esperado (password, debe tener por lo menos un número)
    // agregar una propiedad al objeto vacío
    errors.password = "Password is invalid";
  }
  return errors; // devolver el error
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name:</label>
        <input
          type="firstName"
          name="firstName"
          value={input.firstName}
          onChange={(e) => handleChange(e)}
        />
        {errors.firstName ? (
          <label htmlFor="firstName">{errors.firstName}</label>
        ) : null}
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          value={input.lastName}
          onChange={(e) => handleChange(e)}
        />
        {errors.lastName ? (
          <label htmlFor="lastName">{errors.lastName}</label>
        ) : null}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        {errors.email ? <label htmlFor="email">{errors.email}</label> : null}
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
        {errors.gender ? <label htmlFor="gender">{errors.gender}</label> : null}
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          inputMode="tel"
          name="phone"
          value={input.phone}
          onChange={(e) => handleChange(e)}
        />
        {errors.phone ? <label htmlFor="phone">{errors.phone}</label> : null}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        {errors.password ? (
          <label htmlFor="username">{errors.password}</label>
        ) : null}
        {errors.email ||
        errors.password ||
        errors.gender ||
        errors.phone ||
        !input.phone ||
        !input.gender ||
        !input.email ||
        !input.password ? (
          <input type="submit" disabled />
        ) : (
          <input type="submit" />
        )}
      </form>
    </>
  );
}

export default CreateUser;
