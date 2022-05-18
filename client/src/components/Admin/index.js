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
import Swal from "sweetalert2";
import styles from "./Admin.module.css";

import {
  getAllReports,
  getUserByName,
  getAllPostToAdmin,
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
  deletePost,
  getPremiumPlan,
  createPlansPremiums,
  deletePlansPremiums,
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

let idUser = "";

function Admin() {
  const user = useSelector((state) => state.user);
  const premiumUsers = useSelector((state) => state.premiumUsers);
  const artistUsers = useSelector((state) => state.artistUsers);
  const standardUsers = useSelector((state) => state.standardUsers);
  const commentReports = useSelector((state) => state.commentReports);
  const postReports = useSelector((state) => state.postReports);
  const userReports = useSelector((state) => state.userReports);
  const posts = useSelector((state) => state.allPostToAdmin);
  const userSearch = useSelector((state) => state.usersList);
  const bannedUsers = useSelector((state) => state.bannedUsers);
  const causesOfReport = useSelector((state) => state.causesOfReport);
  const premiumPlans = useSelector((state) => state.premiumPlans);
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

  // create precio, nombre, descuento(1-100)
  // edit planId, precio, nombre, descuento(1-100)
  // delete planId
  // que no se creen dos planes con el mismo nombre
  const [plan, setPlan] = useState({
    idPlanPremium: "",
    namePlanPremium: "",
    priceMembership: "",
    numberOfMonths: "",
    discount: "",
  });

  const [plan2, setPlan2] = useState({
    namePlanPremium: "",
    priceMembership: "",
    numberOfMonths: "",
    discount: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getAllPostToAdmin());
    dispatch(getStandarUsers());
    dispatch(getPremiumUsers());
    dispatch(getArtistUsers());
    // dispatch(getAllReports());
    dispatch(getUserReports());
    dispatch(getCommentReports());
    dispatch(getPostReports());
    dispatch(getAllBannedUsers());
    dispatch(getAllCausesofReport());
    // setTimeout(() => {
    //   dispatch(getPremiumPlan());
    // }, 2000);
    dispatch(getPremiumPlan());
  }, []);
  //console.log(premiumPlans);
  const handleDelete = (e) => {
    //console.log(e.idPost);
    //console.log(e.target.value);
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isDenied) {
        dispatch(deletePost(e.idPost));
        setTimeout(function () {
          dispatch(getAllPostToAdmin());
        }, 1000);
      }
    });
  };

  const handleSubmitInput = (e) => {
    console.log(input);
    e.preventDefault();
    if (!input.user) {
      Swal.fire({
        title: "We were unable to perform your user search 😪",
        confirmButtonColor: "#dd9202",
      });
    } else {
      dispatch(getUserByName(input.user));
    }

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
    setUserId(e.target.name);
    idUser = e.target.name;
    setShowModal(!showModal);
    console.log(e.target.name);
  };
  const handlePlan = (e) => {
    //e.preventDefault();
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
  };
  const handlePlan2 = (e) => {
    //e.preventDefault();
    setPlan2({
      ...plan2,
      [e.target.name]: e.target.value,
    });
  };
  const modifyPlan = () => {
    //e.preventDefault();
    switch (plan.name) {
      case "silver":
        setPlan({
          ...plan,
          numberOfMonths: 1,
        });
        break;
      case "gold":
        setPlan({
          ...plan,
          numberOfMonths: 3,
        });
        break;
      case "platinum":
        setPlan({
          ...plan,
          numberOfMonths: 6,
        });
        break;
      case "ruby":
        setPlan({
          ...plan,
          numberOfMonths: 12,
        });
        break;
      default:
        return { ...plan };
    }
    // const newPlan = {
    //   idPlanPremium: "", //falta como obtener el id
    //   priceMembership: input.price,
    //   namePlanPremium: input.plan,
    //   numberOfMonths: input.months,
    //   discount: input.discount,
    // };
    // dispatch(modifyPlansPremiums(newPlan));
  };
  const handleDeletePlan = (e) => {
    // e.preventDefault();
    console.log(e.idPlanPremium);
    let obj = { idPlanPremium: e.idPlanPremium };
    console.log(obj);
    dispatch(deletePlansPremiums(obj));
  };
  const handleSubmitModifyPlans = (e) => {
    e.preventDefault();
    //console.log(plan);
    if (!plan.priceMembership || !plan.numberOfMonths) {
      Swal.fire({
        title:
          "We were unable to modify this plan 😪 Please, fill in all fields ",
        confirmButtonColor: "#dd9202",
      });
    } else if (
      parseInt(plan.priceMembership) > 1000 ||
      parseInt(plan.priceMembership) <= 0
    ) {
      Swal.fire({
        title:
          "We were unable to modify this plan 😪. Please set a valid price",
        confirmButtonColor: "#dd9202",
      });
    } else {
      premiumPlans &&
        premiumPlans.forEach((e) => {
          if (e.numberOfMonths === parseInt(plan.numberOfMonths)) {
            plan.idPlanPremium = e.idPlanPremium;
          }
        });
      let obj = {
        idPlanPremium: plan.idPlanPremium,
        priceMembership: parseInt(plan.priceMembership),
        numberOfMonths: parseInt(plan.numberOfMonths),
      };
      console.log(obj);
      dispatch(modifyPlansPremiums(plan));
      setTimeout(function () {
        dispatch(getPremiumPlan());
      }, 2000);
    }
  };

  const handleSubmitCreatePlans = (e) => {
    e.preventDefault();
    console.log(premiumPlans);
    let checkName =
      premiumPlans &&
      premiumPlans.map(
        (e) =>
          e.namePlanPremium.toLowerCase() ===
          plan2.namePlanPremium.toLowerCase()
      );

    console.log(checkName);
    if (checkName.includes(true)) {
      Swal.fire({
        title:
          "We were unable to create this plan 😪 The name you have chosen already exists. Please try another one ",
        confirmButtonColor: "#dd9202",
      });
    } else if (
      !plan2.priceMembership ||
      !plan2.numberOfMonths ||
      !plan2.namePlanPremium ||
      !plan2.discount
    ) {
      Swal.fire({
        title:
          "We were unable to create this plan 😪 Please, fill in all fields ",
        confirmButtonColor: "#dd9202",
      });
    } else if (
      parseInt(plan2.priceMembership) > 1000 ||
      parseInt(plan2.priceMembership) <= 0 ||
      parseInt(plan2.discount) < 1 ||
      parseInt(plan2.discount) > 99
    ) {
      Swal.fire({
        title:
          "We were unable to create this plan 😪. Please set a valid price and discount",
        confirmButtonColor: "#dd9202",
      });
    } else {
      let obj = {
        priceMembership: parseInt(plan2.priceMembership),
        namePlanPremium: plan2.namePlanPremium,
        numberOfMonths: parseInt(plan2.numberOfMonths),
        discount: parseInt(plan2.discount),
      };
      console.log(obj);
      dispatch(createPlansPremiums(obj));
      setTimeout(function () {
        dispatch(getPremiumPlan());
      }, 2000);
    }
  };

  const handleUnban = async (e) => {
    console.log(e.target.name);
    dispatch(UnbanUser({ idUser: e.target.name }));
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
                style={{ color: "red" }}
              >
                Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => handleActiveTab("2")}
                style={{ color: "red" }}
              >
                Banned Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "3" ? "active" : ""}
                onClick={() => handleActiveTab("3")}
                style={{ color: "red" }}
              >
                Plans
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "4" ? "active" : ""}
                onClick={() => handleActiveTab("4")}
                style={{ color: "red" }}
              >
                Statistics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "5" ? "active" : ""}
                onClick={() => handleActiveTab("5")}
                style={{ color: "red" }}
              >
                Search Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "6" ? "active" : ""}
                onClick={() => handleActiveTab("6")}
                style={{ color: "red" }}
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
                          <h6 style={{ display: "inline-block" }}>
                            {e.userName}
                          </h6>
                          <Input
                            name={e.idUser}
                            type="button"
                            onClick={handleUnban}
                            value={"Unban"}
                            style={{
                              width: "fit-content",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      );
                    })}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="2">
                  <h6>Name:</h6> <hr className={styles.hr} width="600% " />
                  <h6>Price:</h6> <hr className={styles.hr} width="600% " />
                  <h6>Months:</h6> <hr className={styles.hr} width="600% " />
                  {/* <h6>Discount:</h6> <hr className={styles.hr} width="600% " /> */}
                  <h6>Delete:</h6>
                </Col>
                {premiumPlans &&
                  premiumPlans.map((e) => (
                    <Col sm="2">
                      <h6>
                        {e.namePlanPremium.charAt(0).toUpperCase() +
                          e.namePlanPremium.slice(1)}
                      </h6>
                      <hr className={styles.nohr} />
                      <h6> ${e.priceMembership} </h6>
                      <hr className={styles.nohr} />
                      <h6> {e.numberOfMonths}</h6>
                      <hr className={styles.nohr} />
                      {/* {e.discount ? (
                        <div>
                          <h6>{e.discount}</h6>
                          <hr className={styles.nohr} />
                        </div>
                      ) : (
                        <div>
                          <h6>No Discount</h6>
                          <hr className={styles.nohr} />
                        </div>
                      )} */}
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          marginTop: "0.3em",
                        }}
                        onClick={() => handleDeletePlan(e)}
                      >
                        X
                      </button>
                    </Col>
                  ))}
                <div className={styles.plansPremiums}>
                  <div className={styles.modifyPlan}>
                    <Form onSubmit={(e) => handleSubmitModifyPlans(e)}>
                      <h4 style={{ color: "red" }}>Modify Plans Premiums</h4>
                      <Label htmlFor="type" style={{ color: "white" }}>
                        Number Of Months
                      </Label>
                      <Input
                        type="select"
                        name="numberOfMonths"
                        onChange={(e) => handlePlan(e)}
                        value={plan.numberOfMonths}
                        style={{ width: "15em" }}
                      >
                        <option value="default">Select plan ...</option>
                        <option value="1">1 month</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                      </Input>
                      <Label htmlFor="price" style={{ color: "white" }}>
                        Price :
                      </Label>
                      <Input
                        type="number"
                        name="priceMembership"
                        value={plan.priceMembership}
                        style={{ width: "15em", marginBottom: "1em" }}
                        onChange={(e) => handlePlan(e)}
                      />
                      <Input type="submit" style={{ width: "15em" }} />
                    </Form>
                  </div>
                  <div className={styles.createPlan}>
                    <Form onSubmit={(e) => handleSubmitCreatePlans(e)}>
                      <h4 style={{ color: "red" }}>Create Plans Premiums</h4>
                      <Label htmlFor="type" style={{ color: "white" }}>
                        Name
                      </Label>
                      <Input
                        type="select"
                        name="namePlanPremium"
                        onChange={(e) => handlePlan2(e)}
                        value={plan2.namePlanPremium}
                        style={{ width: "15em" }}
                      >
                        <option value="default">Select plan ...</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
                        <option value="ruby">Ruby</option>
                      </Input>
                      <Label htmlFor="type" style={{ color: "white" }}>
                        Number Of Months
                      </Label>
                      <Input
                        type="select"
                        name="numberOfMonths"
                        onChange={(e) => handlePlan2(e)}
                        value={plan2.numberOfMonths}
                        style={{ width: "15em" }}
                      >
                        <option value="default">Select plan ...</option>
                        <option value="1">1 month</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                      </Input>
                      <Label htmlFor="price" style={{ color: "white" }}>
                        Price :
                      </Label>
                      <Input
                        type="number"
                        name="priceMembership"
                        value={plan2.priceMembership}
                        style={{ width: "15em" }}
                        onChange={(e) => handlePlan2(e)}
                      />
                      <Label htmlFor="discount" style={{ color: "white" }}>
                        Discount :
                      </Label>
                      <Input
                        type="number"
                        name="discount"
                        value={plan2.discount}
                        style={{ width: "15em", marginBottom: "1em" }}
                        onChange={(e) => handlePlan2(e)}
                      />
                      <Input type="submit" style={{ width: "15em" }} />
                    </Form>
                  </div>
                </div>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="4">
                  <h6>Premium Users</h6>
                  {premiumUsers &&
                    premiumUsers.map((e) => {
                      return (
                        <div key={e.idUser}>
                          <h6 style={{ display: "inline-block" }}>
                            {e.userName}
                          </h6>
                          <Input
                            name={e.idUser}
                            type="button"
                            onClick={handleBan}
                            value={"🔨"}
                            style={{
                              width: "fit-content",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      );
                    })}
                </Col>
                <Col sm="4">
                  <h6>Standards Users</h6>
                  {standardUsers &&
                    standardUsers.map((e) => {
                      return (
                        <div key={e.idUser}>
                          <h6 style={{ display: "inline-block" }}>
                            {e.userName}
                          </h6>
                          <Input
                            name={e.idUser}
                            type="button"
                            onClick={handleBan}
                            value={"🔨"}
                            style={{
                              width: "fit-content",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      );
                    })}
                </Col>
                <Col sm="4">
                  <h6>Artists Users </h6>
                  {artistUsers &&
                    artistUsers.map((e) => {
                      return (
                        <div key={e.idUser}>
                          <h6 style={{ display: "inline-block" }}>
                            {e.userName}
                          </h6>
                          <Input
                            name={e.idUser}
                            type="button"
                            onClick={handleBan}
                            value={"🔨"}
                            style={{
                              width: "fit-content",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      );
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
                      placeholder="Search Users..."
                      style={{
                        width: "40em",
                        height: "3em",
                        margin: "2em",
                        border: "5px solid gray",
                        borderRadius: "10px",
                      }}
                    />
                    <Input
                      type="submit"
                      value="Search"
                      style={{
                        width: "40em",
                        height: "3em",
                        margin: "2em",
                        border: "5px solid gray",
                        borderRadius: "10px",
                      }}
                    />
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
                            margin: "10px",
                            width: "150px",
                            height: "50px",
                            textAlign: "center",
                            alignContent: "center",
                          }}
                        >
                          <h6 style={{ display: "inline-block" }}>
                            {e.userName}
                          </h6>
                          <Input
                            name={e.idUser}
                            type="button"
                            onClick={handleBan}
                            value={"🔨"}
                            style={{
                              width: "fit-content",
                              display: "inline-block",
                            }}
                          />
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
                            <Button
                              style={{
                                background: "white",
                                border: "0px",
                                marginLeft: "100px",
                              }}
                              onClick={() => handleDelete(e)}
                            >
                              <FcFullTrash
                                style={{
                                  marginBottom: "0.5em",
                                  marginLeft: "1em",
                                  width: "1.5em",
                                  height: "1.5em",
                                }}
                              />
                            </Button>
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
          />
        </div>
      </div>
    </>
  );
}

const HandleBan = ({ showModal, handleShowModal }) => {
  const [input, setInput] = useState({
    idUser: "",
    causeBan: "Discrimnation",
  });
  const dispatch = useDispatch();
  const causesOfReport = useSelector((state) => state.causesOfReport);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ban = {
      idUser: idUser,
      causeBan: input.causeBan,
    };
    console.log(ban);
    dispatch(banUser(ban));
  };
  const handleClick = () => {
    handleShowModal();
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      idUser: idUser,
    });
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
              value={input.causeBan}
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
            <Input type="text" value={idUser} name="idUser" />
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
