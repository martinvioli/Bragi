import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Label } from "reactstrap";
import { whyArtist } from "../../redux/actionCreators";

const WhyPay = () => {
  const [input, setInput] = useState({
    reason: "",
    userName: "",
    email: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.reason || !input.userName) {
      alert("All fields must be completed");
      return;
    }
    console.log(input);
    dispatch(whyArtist(input));
    alert("Form Send");
    setInput({
      reason: "",
      userName: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2 style={{ color: "white", textAling: "center" }}>WHY ARTIST</h2>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="userName" style={{ color: "white" }}>
            Username :{" "}
          </Label>
          <Input
            type="text"
            name="userName"
            value={input.userName}
            onChange={handleChange}
          />
          <Label htmlFor="email" style={{ color: "white" }}>
            Email :{" "}
          </Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <Label htmlFor="reason" style={{ color: "white" }}>
            Reason why :{" "}
          </Label>
          <Input
            type="textarea"
            name="reason"
            value={input.reason}
            onChange={handleChange}
          />
          <Input type="submit" />
        </Form>
      </div>
    </>
  );
};

export default WhyPay;
