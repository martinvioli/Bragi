import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
} from "reactstrap";
import { getPhotoUser, getToken, getUser } from "../../redux/actionCreators";
import axios from "axios";
import api from "../../Utils";
import { validateEdit } from "../../Utils/validate";
import Swal from "sweetalert2";

function EditProfile({ showModal, handleShowModal }) {
  const user = useSelector((state) => state.user);
  const profileImage = useSelector((state) => state.profileImage);
  const [input, setInput] = useState({
    name: user.name ? user.name : "",
    lastName: user.lastName ? user.lastName : "",
    email: user.email ? user.email : "",
    gender: user.gender ? user.gender : "",
    tel: user.tel ? user.tel : "",
    password: "",
    repeatPassword: "",
    birthday: user.birthday ? user.birthday : "",
    userName: user.userName ? user.userName : "",
    description: user.description ? user.description : "",
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
    description: "",
  });
  const [photoProfile, setPhotoProfile] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [responseEdit, setResponseEdit] = useState("");
  const [refresh, setRefresh] = useState(false);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    if (userCredentials) {
      const userToken = JSON.parse(userCredentials);
      dispatch(getUser(userToken));
      dispatch(getToken(userToken));
      dispatch(getPhotoUser(user.userName));
    }
    if (!userCredentials) {
      //console.log(user);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let username = user.userName;
    dispatch(getUser(token));
    dispatch(getPhotoUser(username));
    setResponseEdit("");
  }, [responseEdit]);

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

    //Para poder pullear
    setErrors(
      validateEdit({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateEdit({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // useEffect(() => {
  //   dispatch(getPhotoUser(null))
  //   console.log(profileImage)
  // },[])

  const handleBlur = (e) => {
    setErrors(
      validateEdit({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleShowPassword = (e) => setShowPassword(!showPassword);

  const handleSubmitBasicData = async (e) => {
    e.preventDefault();
    //console.log(photoProfile);
    const fd = new FormData();
    fd.append("photoProfile", photoProfile);
    fd.append("token", token);
    fd.append("name", input.name ? input.name : user.name);
    fd.append("lastName", input.lastName ? input.lastName : user.lastName);
    fd.append("gender", input.gender ? input.gender : user.gender);
    fd.append(
      "description",
      input.description ? input.description : user.description
    );
    fd.append("birthday", input.birthday ? input.birthday : user.birthday); //Necesitamos user.birthday para que funcione.
    fd.append("tel", input.tel ? input.tel : user.tel);

    const response = await axios.put(api.updateBasicData, fd);
    if (response.data.msgE) {
      setResponseEdit(response.data.msgE);
      Swal.fire(
        "Error",
        "Something has gone grown. Please, try again!.",
        "warning"
      ).then((result) => {
        result.isConfirmed && window.location.reload();
      });
    }
    if (response.data.msg) {
      setResponseEdit(response.data.msg);
      Swal.fire(
        "Great!",
        "You have edited your profile successfully.",
        "success"
      ).then((result) => {
        result.isConfirmed && window.location.reload();
      });
    }
    setInput({
      name: "",
      lastName: "",
      email: "",
      gender: "",
      tel: "",
      password: "",
      repeatPassword: "",
      birthday: "",
      userName: "",
      description: "",
    });
    handleShowModal();
  };

  const handleSubmitSenstiveData = async (e) => {
    e.preventDefault();
    const response = await axios.put(api.updateSensitiveData, {
      token: token,
      email: input.email ? input.email : user.email,
      userName: input.userName ? input.userName : user.userName,
      password: input.password ? input.password : user.password,
      repeatPassword: input.repeatPassword
        ? input.repeatPassword
        : user.repeatPassword,
    });
    if (response.data.msgE) {
      Swal.fire(
        "Error",
        "Something has gone grown. Please, try again!. Please log in again.",
        "warning"
      ).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.removeItem("userCredentials");
          setInput({
            name: "",
            lastName: "",
            email: "",
            gender: "",
            tel: "",
            password: "",
            repeatPassword: "",
            birthday: "",
            userName: "",
            description: "",
          });
          handleShowModal();
          navigate("/");
        }
      });
    }
    if (response.data.msg) {
      Swal.fire(
        "Great!",
        "You have edited your account successfully. Please log in again.",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.removeItem("userCredentials");
          setInput({
            name: "",
            lastName: "",
            email: "",
            gender: "",
            tel: "",
            password: "",
            repeatPassword: "",
            birthday: "",
            userName: "",
            description: "",
          });
          handleShowModal();
          navigate("/");
        }
      });
    }
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  const handleStandard = async () => {
    try {
      const response = await axios.post(api.changeUserToStandard, {
        userName: user.userName,
      });
      Swal.fire(
        "🔮",
        "You are now an fan. Please log in again.",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.localStorage.removeItem("userCredentials");
          handleShowModal();
          navigate("/");
        }
      });
    } catch (error) {}
  };

  const handlePremium = async () => {
    try {
      handleShowModal();
      navigate("/pay");
    } catch (e) {
      alert(e.response.data.msgE);
    }
  };

  const handleArtist = async () => {
    navigate("/whypay");
    // try {
    //   const response = await axios.post(api.changeUserToArtist, {
    //     userName: user.userName,
    //   });
    //   Swal.fire(
    //     "🎭",
    //     "You are now an artist. Please log in again.",
    //     "success"
    //   ).then((result) => {
    //     if (result.isConfirmed) {
    //       window.localStorage.removeItem("userCredentials");
    //       handleShowModal();
    //       navigate("/");
    //     }
    //   });
    // } catch (e) {
    //   alert(e.response.data.msgE);
    // }
  };

  const handleImage = (e) => {
    //console.log(e.target.files[0]);
    setPhotoProfile(e.target.files[0]);
  };

  //Esto es solo para el pull

  return (
    <>
      <Modal size="lg" centered fade scrollable isOpen={showModal}>
        <ModalBody>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === "1" ? "active" : ""}
                  onClick={(e) => handleTabs("1")}
                >
                  Personal Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "active" : ""}
                  onClick={(e) => handleTabs("2")}
                >
                  User Information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "3" ? "active" : ""}
                  onClick={(e) => handleTabs("3")}
                >
                  Change account type
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Form
                  onSubmit={(e) => {
                    handleSubmitBasicData(e);
                  }}
                >
                  <Row>
                    <Col sm="6">
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
                          onBlur={handleBlur}
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
                          onBlur={handleBlur}
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
                          onBlur={handleBlur}
                          invalid={
                            errors.gender || input.gender === "default"
                              ? true
                              : false
                          }
                          valid={!errors.gender && input.gender ? true : false}
                        >
                          <option value="default">Select ...</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Non binary">No Binary</option>
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
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e)}
                          invalid={errors.birthday ? true : false}
                          valid={
                            !errors.birthday && input.birthday ? true : false
                          }
                        />
                        {errors.birthday ? (
                          <FormFeedback tooltip>{errors.birthday}</FormFeedback>
                        ) : (
                          <FormFeedback tooltip></FormFeedback>
                        )}
                      </FormGroup>
                    </Col>

                    <Col>
                      <Input
                        type="file"
                        name="photoProfile"
                        onChange={handleImage}
                      />
                    </Col>
                  </Row>
                  <FormGroup
                    className="position-relative"
                    style={{
                      display: "inline-block",
                      width: "48%",
                      marginLeft: "2%",
                    }}
                  >
                    <Label htmlFor="description">Description:</Label>
                    <Input
                      type="textarea"
                      name="description"
                      value={input.description}
                      onBlur={handleBlur}
                      invalid={errors.description ? true : false}
                      valid={
                        !errors.description && input.description ? true : false
                      }
                      onChange={(e) => handleChange(e)}
                    />
                    {errors.description ? (
                      <FormFeedback tooltip>{errors.description}</FormFeedback>
                    ) : (
                      <FormFeedback tooltip></FormFeedback>
                    )}
                  </FormGroup>
                  {errors.name ||
                  errors.lastName ||
                  errors.gender ||
                  errors.tel ||
                  errors.birthday ||
                  errors.description ? (
                    <Input
                      type="submit"
                      disabled
                      value="Send"
                      style={{
                        marginTop: "2em",
                        backgroundColor: "black",
                        color: "#dd9202",
                        border: "2px solid #dd9202",
                      }}
                    />
                  ) : (
                    <Input
                      type="submit"
                      className="btn-primary btn"
                      value="Send"
                      style={{
                        marginTop: "2em",
                        background: "#dd9202",
                        color: "black",
                        border: "2px solid #dd9202",
                      }}
                    />
                  )}
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form onSubmit={(e) => handleSubmitSenstiveData(e)}>
                  <FormGroup
                    className="position-relative"
                    style={{ width: "48%" }}
                  >
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
                      display: "block",
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
                    <Label htmlFor="password">Password:</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={input.password}
                      onChange={(e) => handleChange(e)}
                      onBlur={handleBlur}
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
                      onBlur={handleBlur}
                      invalid={errors.repeatPassword ? true : false}
                      valid={
                        !errors.repeatPassword && input.repeatPassword
                          ? true
                          : false
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
                      <FormFeedback tooltip>
                        {errors.repeatPassword}
                      </FormFeedback>
                    ) : (
                      <FormFeedback tooltip></FormFeedback>
                    )}
                  </FormGroup>
                  {errors.userName || errors.password || errors.email ? (
                    <Input
                      type="submit"
                      disabled
                      value="Send"
                      style={{
                        marginTop: "2em",
                        background: "#dd9202",
                        color: "black",
                        border: "2px solid #dd9202",
                      }}
                    />
                  ) : (
                    <Input
                      type="submit"
                      className="btn-primary btn"
                      value="Send"
                      style={{
                        marginTop: "2em",
                        background: "#dd9202",
                        color: "black",
                        border: "2px solid #dd9202",
                      }}
                    />
                  )}
                </Form>
              </TabPane>
              <TabPane tabId="3">
                {user.typeUser === "Artist" && (
                  <Button
                    onClick={() => handleStandard()}
                    style={{
                      marginTop: "2em",
                      background: "#dd9202",
                      color: "black",
                      border: "2px solid #dd9202",
                      marginRight: "20px",
                    }}
                  >
                    Became fan
                  </Button>
                )}

                {user.typeUser === "Standard" && (
                  <Button
                    onClick={() => handlePremium()}
                    style={{
                      marginTop: "2em",
                      background: "#dd9202",
                      color: "black",
                      border: "2px solid #dd9202",
                      marginRight: "20px",
                    }}
                  >
                    Became Premium
                  </Button>
                )}

                {user.typeUser !== "Artist" && (
                  <Button
                    onClick={() => handleArtist()}
                    style={{
                      marginTop: "2em",
                      background: "#dd9202",
                      color: "black",
                      border: "2px solid #dd9202",
                      marginRight: "20px",
                    }}
                  >
                    Became Artist
                  </Button>
                )}
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            style={{
              marginTop: "2em",
              background: "#dd9202",
              color: "black",
              border: "2px solid #dd9202",
              marginRight: "20px",
            }}
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
