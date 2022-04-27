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
import styles from "./Authenticate.module.css";
function Authenticate() {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleClick = () => {
    alert("Successful Registration");
    setInput("");
  };

  return (
    <div className={styles.background}>
      <Card
        style={{ paddingTop: "5em" }}
        body
        color="info"
        className="bg-transparent"
      >
        <CardTitle tag="h5"></CardTitle>
        <CardText>
          <h1>AUTHENTICATE</h1>
          <h2>
            Thanks you for registering on BRAGI <br />
            Please check your email and put your code here
          </h2>
          If you can't find this code, be sure to check your spam.
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
