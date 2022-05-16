import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Form,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Nav,
  Label,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  getAllReports,
  getUserByName,
  getAllPost,
  getStandarUsers,
  getPremiumUsers,
  getArtistUsers,
  getUserReports,
  getCommentReports,
  getPostReports,
  banUser,
  UnbanUser,
  modifyPlansPremiums,
  getAllBannedUsers,
  getAllCausesofReport,
} from "../../redux/actionCreators";
import {
  FcEditImage,
  FcFullTrash,
  FcLike,
  FcRedo,
  FcLink,
  FcComments,
  FcLikePlaceholder,
} from "react-icons/fc";
import api from "../../Utils";
import { Link } from "react-router-dom";
function Admin() {
  const user = useSelector((state) => state.user);
  const premiumUsers = useSelector((state) => state.premiumUsers);
  const artistUsers = useSelector((state) => state.artistUsers);
  const standardUsers = useSelector((state) => state.standardUsers);
  const commentReports = useSelector((state) => state.commentReports);
  const postReports = useSelector((state) => state.postReports);
  const userReports = useSelector((state) => state.userReports);
  const posts = useSelector((state) => state.posts);
  const userSearch = useSelector((state) => state.usersList);
  const bannedUsers = useSelector((state) => state.bannedUsers);
  const causesOfReport = useSelector((state) => state.causesOfReport);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [input, setInput] = useState({
    plan: "",
    user: "",
    posts: posts,
    price: "",
    discount: "",
  });

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getStandarUsers());
    dispatch(getPremiumUsers());
    dispatch(getArtistUsers());
    // dispatch(getAllReports());
    dispatch(getUserReports());
    dispatch(getCommentReports());
    dispatch(getPostReports());
    dispatch(getAllBannedUsers());
    dispatch(getAllCausesofReport());
  }, []);

  const handleSubmitInput = (e) => {
    e.preventDefault();
    dispatch(getUserByName(input.user));
    setInput({
      plan: "",
      user: "",
      posts: posts,
      price: "",
      discount: "",
      months: 1,
      causeBan: "",
    });
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleBan = async (e) => {
    setShowModal(true);
    setUserId(e.target.value);
    const ban = {
      idUser: "",
      causeBan: input.causeBan ? input.causeBan : "For multiple Reasons",
    };
    dispatch(banUser(ban));
    alert("Banear");
  };

  const modifyPlan = (e) => {
    e.preventDefault();
    switch (input.plan) {
      case "silver":
        setInput({
          ...input,
          numberOfMonths: 1,
        });
        break;
      case "gold":
        setInput({
          ...input,
          numberOfMonths: 3,
        });
        break;
      case "platinum":
        setInput({
          ...input,
          numberOfMonths: 6,
        });
        break;

      default:
        return { ...input };
    }
    const newPlan = {
      idPlanPremium: "", //falta como obtener el id
      priceMembership: input.price,
      namePlanPremium: input.plan,
      numberOfMonths: input.months,
      discount: input.discount,
    };
    dispatch(modifyPlansPremiums(newPlan));
  };

  const handleUnban = async (e) => {
    //hay que obtener el id del usuario
    const id = {
      idUser: "",
    };
    dispatch(UnbanUser(id));
    alert("Desbaneado");
  };

  const handleActiveTab = (tab) => setActiveTab(tab);

  return (
    <>
      <div className="container">
        <h1
          style={{ color: "white", textAlign: "center", marginBottom: "50px" }}
        >
          ADMIN🔨 PROFILE
        </h1>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => handleActiveTab("1")}
              >
                Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => handleActiveTab("2")}
              >
                Banned Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "3" ? "active" : ""}
                onClick={() => handleActiveTab("3")}
              >
                Plans
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "4" ? "active" : ""}
                onClick={() => handleActiveTab("4")}
              >
                Statistics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "5" ? "active" : ""}
                onClick={() => handleActiveTab("5")}
              >
                Search Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "6" ? "active" : ""}
                onClick={() => handleActiveTab("6")}
              >
                Search Posts
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} style={{ color: "white" }}>
            <TabPane tabId="1">
              <Row>
                <Col sm="4">
                  <h5>Users</h5>
                  {userReports.length &&
                    userReports.map((e) => {
                      return <div key={e.idReport}>{e.idReport}</div>;
                    })}
                </Col>
                <Col sm="4">
                  {" "}
                  <h5>Posts</h5>
                  {postReports &&
                    postReports.map((e) => {
                      return <div key={e.idReport}>{e.idReport}</div>;
                    })}
                </Col>
                <Col sm="4">
                  {" "}
                  <h5>Comments</h5>
                  {commentReports &&
                    commentReports.map((e) => {
                      return <div key={e.idReport}>{e.idReport}</div>;
                    })}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="6">
                  <h6>LIST OF BANNED USERS</h6>
                  {bannedUsers &&
                    bannedUsers.map((e) => {
                      return (
                        <div key={e.idUser}>
                          {e.name} {e.lastName}
                        </div>
                      );
                    })}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="4">
                  Type
                  <h6>Silver</h6>
                  <h6>Gold</h6>
                  <h6>Platinum</h6>
                </Col>

                <Col sm="4">
                  Months
                  <h6>1 </h6>
                  <h6>3</h6>
                  <h6>6</h6>
                </Col>
                <Col sm="4">
                  Prices
                  <h6>$0.99</h6>
                  <h6>$1.49</h6>
                  <h6>$1.99</h6>
                </Col>
                <Form onSubmit={modifyPlan}>
                  <h4 style={{ color: "red" }}>Modify Plans Premiums</h4>
                  <Input
                    type="select"
                    name="plan"
                    onChange={handleInput}
                    value={input.plan}
                    style={{ maxWidth: "46%", marginRight: "2%" }}
                  >
                    <option value="default">Select plan ...</option>
                    <option value="silver">1 month</option>
                    <option value="gold">3 months</option>
                    <option value="platinum">6 months</option>
                  </Input>
                  <Label htmlFor="price" style={{ color: "white" }}>
                    Price :{" "}
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    value={input.price}
                    style={{ maxWidth: "46%", marginRight: "2%" }}
                  />
                  <Label htmlFor="discount" style={{ color: "white" }}>
                    Discount :{" "}
                  </Label>
                  <Input
                    type="number"
                    name="discount"
                    value={input.discount}
                    style={{ maxWidth: "46%", marginRight: "2%" }}
                  />
                  <Input
                    type="submit"
                    style={{ maxWidth: "46%", marginRight: "2%" }}
                  />
                </Form>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="4">
                  <h6>Premium Users</h6>
                  {premiumUsers &&
                    premiumUsers.map((e) => {
                      return (
                        <div key={e.id}>
                          <h6>{e.userName}</h6>
                          <Button value={e.id} onClick={handleBan}>
                            🔨
                          </Button>
                        </div>
                      );
                    })}
                </Col>
                <Col sm="4">
                  <h6>Standards Users</h6>
                  {standardUsers &&
                    standardUsers.map((e) => {
                      return <div key={e.id}>{e.userName}</div>;
                    })}
                </Col>
                <Col sm="4">
                  <h6>Artists Users </h6>
                  {artistUsers &&
                    artistUsers.map((e) => {
                      return <div key={e.id}>{e.userName}</div>;
                    })}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="5">
              <Row>
                <div>
                  <Form onSubmit={handleSubmitInput}>
                    <Label htmlFor="user">Search For Users</Label>
                    <Input
                      //color="bg-danger"
                      onChange={handleInput}
                      type="text"
                      value={input.user}
                      name="user"
                      placeholder="Search User..."
                    />
                    <Input type="submit" value="Search" />
                  </Form>
                  {userSearch[0] &&
                    userSearch[0].map((e) => {
                      return (
                        <div
                          key={e.idUser}
                          style={{
                            display: "inline-block",
                            border: "1px solid orange",
                            borderRadius: "20px",
                            margin: "5px",
                          }}
                        >
                          <h5 style={{ color: "white", marginTop: "1em" }}>
                            @{e.userName}
                          </h5>
                          <Button onClick={handleBan}>❌</Button>
                          <Button onClick={handleUnban}>✔️</Button>
                        </div>
                      );
                    })}
                </div>
              </Row>
            </TabPane>
            <TabPane tabId="6">
              <Row>
                {/* <Form onSubmit={handleSubmitInput}>
                  <Label htmlFor="user">Search For Posts</Label>
                  <Input
                    onChange={handleInput}
                    type="text"
                    value={input.posts}
                    name="post"
                    placeholder="Search Posts..."
                  />
                  <Input type="submit" value="Search" />
                </Form> */}
                <div>
                  {posts &&
                    posts.map((e) => {
                      return (
                        <Card
                          style={{
                            marginLeft: "20em",
                            width: "50%",
                            height: "43%",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          key={e.token}
                        >
                          <CardBody>
                            <CardTitle
                              style={{
                                color: "orange",
                              }}
                              tag="h7"
                            >
                              {e.User.userName === user.userName ? (
                                e.User.userName
                              ) : (
                                <Link
                                  to={`/profile/${e.User.userName}`}
                                  // onClick={() =>
                                  //   dispatch(
                                  //     getUseProfile(token, e.User.userName)
                                  //   )
                                  // }
                                >
                                  {e.User.userName}
                                </Link>
                              )}
                            </CardTitle>
                            <CardTitle
                              style={{
                                color: "blue",
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                              tag="h7"
                            >
                              {e.datePost}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              {e.contentPost}
                            </CardSubtitle>
                          </CardBody>
                          {e.imagePost && (
                            <div>
                              <img
                                src={e.imagePost}
                                class="img-fluid"
                                alt="Responsive"
                              />
                            </div>
                          )}
                          <div>
                            <CardLink href={e.linkContent}>
                              <FcLink
                                style={{
                                  marginBottom: "0.4em",
                                  width: "2em",
                                  height: "2em",
                                }}
                              ></FcLink>
                            </CardLink>
                            <div
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2.5em",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  paddingRight: "0.5em",
                                }}
                              >
                                {e.Likes.length}
                              </span>
                              {e.Likes.some(
                                (e) => e.userName === user.userName
                              ) ? (
                                <FcLike
                                  style={{
                                    width: "2em",
                                    height: "2em",
                                  }}
                                  // onClick={() => {
                                  //   dispatch(
                                  //     falseDislike({ index: posts.indexOf(e) })
                                  //   );
                                  //   dispatch(
                                  //     dislike({ token, idPost: e.idPost })
                                  //   );
                                  // }}
                                />
                              ) : (
                                <FcLikePlaceholder
                                  style={{
                                    width: "2em",
                                    height: "2em",
                                  }}
                                  // onClick={() => {
                                  //   dispatch(
                                  //     falseLike({
                                  //       index: posts.indexOf(e),
                                  //       userName: user.userName,
                                  //     })
                                  //   );
                                  //   dispatch(like({ token, idPost: e.idPost }));
                                  // }}
                                />
                              )}
                            </div>
                            <FcRedo
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2em",
                                marginRight: "1em",
                                width: "2em",
                                height: "2em",
                              }}
                              // onClick={() => {
                              //   setViewPost({ ...e });
                              //   dispatch(getAllComments(e.idPost));
                              //   handleShowModalComments();
                              //   setCommentInput({
                              //     ...commentInput,
                              //     idPost: e.idPost,
                              //     token: token,
                              //   });
                              //   setSlicer(3);
                              // }}
                            />
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </Row>
            </TabPane>
          </TabContent>
          <HandleBan
            showModal={showModal}
            handleShowModal={() => setShowModal(false)}
            idUser={userId}
          />
        </div>
      </div>
    </>
  );
}

const HandleBan = ({ showModal, handleShowModal, idUser }) => {
  const [input, setInput] = useState({
    idUser: idUser,
    causeBan: "",
  });
  const causesOfReport = useSelector((state) => state.causesOfReport);
  const handleSubmit = () => {
    console.log(input);
  };
  const handleClick = () => {
    handleShowModal();
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Modal isOpen={showModal}>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Input
              type="select"
              value={input}
              name="causeBan"
              onChange={handleChange}
            >
              {causesOfReport &&
                causesOfReport.map((e) => {
                  return (
                    <>
                      <option value={e}>{e}</option>
                    </>
                  );
                })}
            </Input>
            <Input type="submit" />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClick}>Back</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Admin;
