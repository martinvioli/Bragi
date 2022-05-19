import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Label } from "reactstrap";
import { whyArtist } from "../../redux/actionCreators";
import api from "../../Utils";

const WhyPay = () => {
  // const responseToArtist = useSelector((state) => state.responseToArtist);

  const [input, setInput] = useState({
    reason: "",
    userName: "",
    email: "",
  });

  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!input.email || !input.reason || !input.userName) {
        alert("All fields must be completed");
        return;
      }
      const response = await axios.post(api.whyArtist, input);

      alert(response.data.msg);
      setInput({
        reason: "",
        userName: "",
        email: "",
      });
    } catch (error) {
      alert(error.response.data.msgE);
      setInput({
        reason: "",
        userName: "",
        email: "",
      });
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2 style={{ color: "white", textAlign: "center" }}>
        Do you want to became an artist? Give us your reasons
      </h2>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="userName"
            style={{ color: "#dd9202", fontSize: "14px" }}
          >
            Username :{" "}
          </Label>
          <Input
            type="text"
            name="userName"
            value={input.userName}
            onChange={handleChange}
          />
          <Label htmlFor="email" style={{ color: "#dd9202", fontSize: "14px" }}>
            Email :{" "}
          </Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <Label
            htmlFor="reason"
            style={{ color: "#dd9202", fontSize: "14px" }}
          >
            Reason why. Please include a link to your music:{" "}
          </Label>
          <Input
            type="textarea"
            name="reason"
            value={input.reason}
            onChange={handleChange}
          />
          <Input
            type="submit"
            style={{
              marginTop: "2em",
              background: "#dd9202",
              color: "black",
              border: "2px solid #dd9202",
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default WhyPay;
