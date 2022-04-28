import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Authenticate.module.css";
import axios from "axios";

function Authenticate() {
  const [input, setInput] = React.useState({
    code: "",
    token: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async (input) => {
    try {
      const userCredentials = window.localStorage.getItem("userCredentials");
      const user = JSON.parse(userCredentials);
      if (user.token) {
        input.token = user.token;
      }
      const response = await axios.post("url", input);
      alert(response.data.msg);
      navigate("/");
      setInput("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.background}>
      <Card
        style={{ margin: "10em", paddingTop: "2em", border: "7px solid black" }}
        body
        color="info"
        // className="bg-transparent"
      >
        <CardTitle tag="h5"></CardTitle>
        <CardText>
          <h1 className={styles.title}>AUTHENTICATE</h1>
          <h2 className={styles.subtitle}>
            Thanks you for registering on BRAGI <br />
            Please check your email and put your code here
          </h2>
          <p className={styles.text}>
            If you can't find this code, be sure to check your spam.
          </p>
        </CardText>
        <FormGroup className="position-relative">
          <Label htmlFor="input">CODE</Label>
          <Input
            type="text"
            name="code"
            value={input.code}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button onClick={handleClick}>SEND</Button>
      </Card>
    </div>
  );
}

export default Authenticate;
