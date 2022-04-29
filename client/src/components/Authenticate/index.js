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
import api from "../../Utils";

function Authenticate() {
  const [inputToken, setInputToken] = React.useState({
    code: "",
    token: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputToken({
      ...inputToken,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    console.log(localStorage);
    try {
      const userCredentials = window.localStorage.getItem("userCredentials");
      const userToken = JSON.parse(userCredentials);
      if (userToken) {
        setInputToken({ ...inputToken, token: userToken });
      }
      const response = await axios.post(`${api.authenticateUrl}`, inputToken);
      setInputToken("");
      if (response.data.msg) {
        alert(response.data.msg);
        navigate("/home");
        return;
      }
      if (response.data.msgE) {
        alert(response.data.msgE);
      }
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
          <Label htmlFor="code">CODE</Label>
          <Input
            type="text"
            name="code"
            value={inputToken.code}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button onClick={handleClick}>SEND</Button>
      </Card>
    </div>
  );
}

export default Authenticate;
