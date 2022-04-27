import React from "react";

function Authenticate() {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleClick = () => {
    alert("Successful Registration");
  };
  return (
    <div>
      <h1>Authenticate</h1>
      <h2>
        Thanks you for registering on BRAGI <br />
        Please check your email and put your code here
      </h2>
      <input
        onChange={(e) => handleChange(e)}
        value={input}
        type="text"
      ></input>
      <button onClick={handleClick}>SEND</button>
    </div>
  );
}

export default Authenticate;
