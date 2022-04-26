import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";

function validate(input) {
  const errors = {}; // un  objeto que contenga el error
  if (!input.email) {
    // sino hay nada en email, agregar propiedad al objeto
    errors.email = "email is required";
    // se compara la regular expression con el input de email
  } else if (!/\S+@+\S+.+\S+/.test(input.email)) {
    // si lo que está escrito es distinto a lo esperado (mail),
    // agregar una propiedad al objeto vacío
    errors.email = "email is invalid";
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

function LandingPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
      <Form>
        <FormGroup className="position-relative">
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
            invalid={errors.email ? true : false}
          />
          {errors.email && <FormFeedback tooltip>{errors.email}</FormFeedback>}
        </FormGroup>
      </Form>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <label className={styles.errors} htmlFor="email">
            {errors.password}
          </label>
        ) : null}
        {errors.email || errors.password || !input.email || !input.password ? (
          <input type="submit" disabled />
        ) : (
          <input type="submit" />
        )}
      </form>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </>
  );
}

export default LandingPage;
