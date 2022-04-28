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
function Authenticate() {
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleClick = () => {
    alert("Successful Registration");
    navigate("/");
    setInput("");
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
            name="input"
            value={input}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button onClick={handleClick}>SEND</Button>
      </Card>
    </div>
  );
}

export default Authenticate;
