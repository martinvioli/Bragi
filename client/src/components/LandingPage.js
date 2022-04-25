import React, { useEffect, useState } from "react";

function validate(input) {
  const errors = {}; // un  objeto que contenga el error
  if (!input.username) {
    // sino hay nada en username, agregar propiedad al objeto
    errors.username = "Username is required";
    // se compara la regular expression con el input de username
  } else if (!/\S+@+\S+.+\S+/.test(input.username)) {
    // si lo que está escrito es distinto a lo esperado (mail),
    // agregar una propiedad al objeto vacío
    errors.username = "Username is invalid";
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
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   setErrors(validate(errors));
  // }, [input]);

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

  //git push --set-upstream origin ale
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        {errors.username ? (
          <label htmlFor="username">{errors.username}</label>
        ) : null}
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <label htmlFor="username">{errors.password}</label>
        ) : null}
        {errors.username ||
        errors.password ||
        !input.username ||
        !input.password ? (
          <input type="submit" disabled />
        ) : (
          <input type="submit" />
        )}
      </form>

      <h1>Holis</h1>
    </>
  );
}

export default LandingPage;
