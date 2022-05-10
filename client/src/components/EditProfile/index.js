import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import { getPhotoUser, getToken, getUser } from "../../redux/actionCreators";
import axios from "axios";
import api from "../../Utils";

function EditProfile({ showModal, handleShowModal }) {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    gender: "",
    tel: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    userName: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    repeatPassword: "",
    birthday: "",
    userName: "",
    tel: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    if (userCredentials) {
      const userToken = JSON.parse(userCredentials);
      dispatch(getUser(userToken));
      dispatch(getToken(userToken));
      dispatch(getPhotoUser(user.userName));
    }
    if (!userCredentials) {
      console.log(user);
      navigate("/");
    }
  }, []);

  const { baseUrl } = api;

  const checkData = async (e) => {
    if (e.target.name === "email") {
      const response = await axios.get(
        `${baseUrl}register/validate?email=${input.email}`
      );
      if (response.data.hasOwnProperty("msgE")) {
        setErrors({ ...errors, email: response.data.msgE });
      }
    } else {
      const response = await axios.get(
        `${baseUrl}register/validate?userName=${input.userName}`
      );
      if (response.data.hasOwnProperty("msgE")) {
        setErrors({ ...errors, userName: response.data.msgE });
      }
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    const response = await axios.post(api.updateBasicData);
  };

  const handleTabs = (e, tab) => {
    if (!e.target.className.includes("active")) {
      e.target.className = e.target.className + " active";
    }
    setActiveTab(tab);
  };

  const handleBlur = (e) => {
    e.target.className.replace("active", "");
  };

  const handlePremium = async () => {
    try {
      const response = await axios.post(api.changeUserToPremium, {
        userName: user.userName,
      });
      alert(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal centered isOpen={showModal}>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup className="position-relative" style={{ width: "48%" }}>
              <Label htmlFor="userName">Username:</Label>
              <Input
                type="text"
                name="userName"
                value={input.userName}
                onChange={(e) => handleChange(e)}
                invalid={errors.userName ? true : false}
                valid={!errors.userName && input.userName ? true : false}
                onBlur={checkData}
              />
              {errors.userName ? (
                <FormFeedback tooltip>{errors.userName}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
            <FormGroup
              className="position-relative"
              style={{
                display: "inline-block",
                width: "48%",
                marginRight: "2%",
              }}
            >
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                invalid={errors.email ? true : false}
                valid={!errors.email && input.email ? true : false}
                onBlur={checkData}
              />
              {errors.email ? (
                <FormFeedback tooltip>{errors.email}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>

            <FormGroup
              className="position-relative"
              style={{
                display: "inline-block",
                width: "48%",
                marginRight: "2%",
              }}
            >
              <Label htmlFor="gender">Gender:</Label>
              <Input
                onChange={(e) => handleChange(e)}
                type="select"
                name="gender"
                value={input.gender}
                invalid={
                  errors.gender || input.gender === "default" ? true : false
                }
                valid={!errors.gender && input.gender ? true : false}
              >
                <option value="default">Select ...</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non Binary">No Binary</option>
                <option value="Other">Other</option>
                {errors.gender ? (
                  <FormFeedback tooltip>{errors.gender}</FormFeedback>
                ) : (
                  <FormFeedback tooltip></FormFeedback>
                )}
              </Input>
            </FormGroup>
            <FormGroup
              className="position-relative"
              style={{
                display: "inline-block",
                width: "48%",
                marginLeft: "2%",
              }}
            >
              <Label htmlFor="date">Date of Birth:</Label>
              <Input
                type="date"
                name="birthday"
                value={input.birthday}
                onChange={(e) => handleChange(e)}
                invalid={errors.birthday ? true : false}
                valid={!errors.birthday && input.birthday ? true : false}
              />
              {errors.birthday ? (
                <FormFeedback tooltip>{errors.birthday}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
            <FormGroup
              className="position-relative"
              style={{
                display: "inline-block",
                width: "48%",
                marginRight: "2%",
              }}
            >
              <Label htmlFor="password">Password:</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={(e) => handleChange(e)}
                invalid={errors.password ? true : false}
                valid={!errors.password && input.password ? true : false}
                style={{ paddingLeft: "2.5em" }}
              />
              <input
                type="button"
                onClick={handleShowPassword}
                value="👁"
                style={{
                  border: "none",
                  backgroundColor: "#ffffff00",
                  top: "2.4em",
                  position: "absolute",
                  borderRight: "1px solid rgb(197, 197, 197)",
                  display: "inline",
                }}
              />

              {errors.password ? (
                <FormFeedback tooltip>{errors.password}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>

            <FormGroup
              className="position-relative"
              style={{
                display: "inline-block",
                width: "48%",
                marginLeft: "2%",
              }}
            >
              <Label htmlFor="repeatPassword">Repeat Password:</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="repeatPassword"
                value={input.repeatPassword}
                onChange={(e) => handleChange(e)}
                invalid={errors.repeatPassword ? true : false}
                valid={
                  !errors.repeatPassword && input.repeatPassword ? true : false
                }
                style={{ paddingLeft: "2.5em" }}
              />
              <input
                type="button"
                onClick={handleShowPassword}
                value="👁"
                style={{
                  border: "none",
                  backgroundColor: "#ffffff00",
                  top: "2.4em",
                  position: "absolute",
                  borderRight: "1px solid rgb(197, 197, 197)",
                  display: "inline",
                }}
              />
              <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
              {errors.repeatPassword ? (
                <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
              ) : (
                <FormFeedback tooltip></FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="position-relative"></FormGroup>
            <FormGroup className="position-relative"></FormGroup>
            <FormGroup className="position-relative"></FormGroup>
            {errors.name ||
            errors.lastName ||
            errors.gender ||
            errors.tel ||
            errors.email ||
            errors.birthday ||
            errors.password ||
            errors.repeatPassword ||
            errors.userName ||
            !input.name ||
            !input.lastName ||
            !input.tel ||
            !input.userName ||
            !input.gender ||
            !input.email ||
            !input.birthday ||
            !input.password ||
            !input.repeatPassword ? (
              <Input type="submit" disabled value="Send" />
            ) : (
              <Input
                type="submit"
                className="btn-primary btn"
                value="Send"
                disabled
              />
            )}
          </Form>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink className="active" onClick={(e) => handleTabs(e, "1")}>
                  Personal Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className=""
                  onClick={(e) => handleTabs(e, "2")}
                  onBlur={handleBlur}
                >
                  User Information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="" onClick={(e) => handleTabs(e, "3")}>
                  Premium Suscription
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <FormGroup
                      className="position-relative"
                      style={{
                        display: "inline-block",
                        width: "48%",
                        marginRight: "2%",
                      }}
                    >
                      <Label htmlFor="name">First name:</Label>
                      <Input
                        type="name"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                        invalid={errors.name ? true : false}
                        valid={!errors.name && input.name ? true : false}
                      />
                      {errors.name ? (
                        <FormFeedback tooltip>{errors.name}</FormFeedback>
                      ) : (
                        <FormFeedback tooltip></FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup
                      className="position-relative"
                      style={{
                        display: "inline-block",
                        width: "48%",
                        marginLeft: "2%",
                      }}
                    >
                      <Label htmlFor="lastName">Last name:</Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={input.lastName}
                        onChange={(e) => handleChange(e)}
                        invalid={errors.lastName ? true : false}
                        valid={
                          !errors.lastName && input.lastName ? true : false
                        }
                      />
                      {errors.lastName ? (
                        <FormFeedback tooltip>{errors.lastName}</FormFeedback>
                      ) : (
                        <FormFeedback tooltip></FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup
                      className="position-relative"
                      style={{
                        display: "inline-block",
                        width: "48%",
                        marginLeft: "2%",
                      }}
                    >
                      <Label htmlFor="tel">Tel: </Label>
                      <Input
                        type="number"
                        name="tel"
                        value={input.tel}
                        onChange={(e) => handleChange(e)}
                        invalid={errors.tel ? true : false}
                        valid={!errors.tel && input.tel ? true : false}
                      />
                      {errors.tel ? (
                        <FormFeedback tooltip>{errors.tel}</FormFeedback>
                      ) : (
                        <FormFeedback tooltip></FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <Button onClick={handlePremium}>Became Premium</Button>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            style={{ marginTop: "2em" }}
            onClick={handleShowModal}
          >
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditProfile;
