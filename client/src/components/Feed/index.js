import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changeTypeOfPost,
  deletePost,
  dislike,
  falseDislike,
  falseLike,
  getAllComments,
  getOwnPosts,
  getToken,
  getUseProfile,
  getUser,
  like,
  userNewComment,
  userNewPost,
  getPhotoUser,
  falseAddComment,
} from "../../redux/actionCreators";
import styles from "./Feed.module.css";
import { getAllPost } from "../../redux/actionCreators";
import {
  FcEditImage,
  FcFullTrash,
  FcLike,
  FcRedo,
  FcLink,
  FcComments,
  FcLikePlaceholder,
} from "react-icons/fc";
import { GoReport } from "react-icons/go";
import {
  Input,
  Form,
  Button,
  Card,
  CardBody,
  CardText,
  CardLink,
  CardTitle,
  CardSubtitle,
  CardImg,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import api from "../../Utils";

const fakePosts = [
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
    link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
    image: "https://picsum.photos/318/180",
  },
  {
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
    link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
    image: "https://picsum.photos/318/180",
  },
  {
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
    link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
    image: "https://picsum.photos/318/180",
  },
  {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
    link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
    image: "https://picsum.photos/318/180",
  },
];

export default function Feed() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const profileImage = useSelector((state) => state.profileImage);
  // console.log(posts[0].User.userName)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    contentPost: "",
    token: "",
    linkContent: "",
    imagePost: "",
    postIsPremium: false,
  });
  const [showModal, setShowModal] = useState(false);
  //const [inputSelect, setInSelect] = useState({select:""})
  useEffect(() => {
    setInput({ ...input, token: token });
  }, [token]);

  //useEffect(() => {}, []);
  useEffect(() => {
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    dispatch(getToken(userToken));
    dispatch(getUser(userToken));
    // posts.forEach((e) => {
    //   console.log(e)
    //   dispatch(getPhotoUser(e.userName))
    // })
    // setTimeout(function () {
    //   dispatch(getAllPost());
    // }, 1000);
    dispatch(getAllPost());
    if (user.typeUser === "admin") {
      navigate("/admin");
    }
    if (!userToken) {
      navigate("/");
    }
  }, []);

  // posts && posts.forEach((e) => {
  //    console.log(e)
  //   dispatch(getPhotoUser(e.User.userName));
  // });

  const handleSearchImage = (e) => {
    setInput({
      ...input,
      imagePost: e.target.files[0],
    });
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleClick(e) {
    e.preventDefault();
    //console.log(input);
    dispatch(userNewPost({ ...input, contentPost: input.contentPost.trim() }));

    setTimeout(function () {
      dispatch(getOwnPosts(user.userName));
    }, 1000);
    setInput({
      token: token,
      contentPost: "",
      linkContent: "",
      imagePost: "",
    });
  }

  const onClickContent = (e) => {
    // console.log(e)
    if (e === "" || e === null || e === undefined) {
      Swal.fire({
        title: "Oops...",
        text: "The artist did not provide a link to this post",
        icon: "error",
        cancelButtonText: "Close",
        cancelButtonColor: "#E74C3C ",
        showCancelButton: true,
        showConfirmButton: false,
      });
    } else {
      window.location.href = e;
    }
  };

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
          user.typeUser === "Artist" && dispatch(getOwnPosts(user.userName));
          user.typeUser !== "Artist" && dispatch(getAllPost());
        }, 1000);
      }
    });
  };

  // ESTO PARA CUANDO SUBAMOS LA IMAGEN // axios.post("url", "archivo a postear", {
  // //   onUploadProgress: (progressEvent) => {
  // //     console.log(
  // //       `Upload Progress: ${Math.round(
  // //         (progressEvent.loaded / progressEvent.total) * 100
  // //       )}% `
  // //     );
  // //   },
  // });

  // SECTOR MODAL VER COMENTARIOS
  const [viewPost, setViewPost] = useState();
  const [showModalComments, setShowModalComments] = useState(false);

  function handleShowModalComments() {
    setShowModalComments(!showModalComments);
  }

  const comments = useSelector((state) => state.comments);

  const [commentInput, setCommentInput] = useState({
    commentContent: "",
    token: null,
    idPost: null,
  });

  const [slicer, setSlicer] = useState(3);

  //console.log(posts);

  const handlePremiumPost = (e) => {
    e.preventDefault();
    // setInput({
    //   ...input,
    //   select : e.target.value
    // })
    if (e.target.value === "Premium") {
      setInput({
        ...input,
        postIsPremium: true,
      });
    } else {
      setInput({
        ...input,
        postIsPremium: false,
      });
    }
  };

  //Reportes
  function openReport(e, type) {
    // console.log({token, id: e.idComment})
    const swal = Swal.fire({
      title: "REPORT A POST",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Report",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3741",
      icon: "warning",
      input: "select",
      inputOptions: {
        Discrimnation: "Discrimination",
        "Verbal Abuse": "Verbal Abuse",
        "Blasphemous Dialog": "Blasphemous Dialog",
        "Sexual Situations or Dialog": "Sexual Situations or Dialog",
      },
      inputPlaceholder: "Select One Report Cause",
    });
    if (type === "comment") {
      swal.update({ title: "REPORT A COMMENT" });
    }
    if (type === "user") {
      swal.update({ title: "REPORT A USER" });
    }
    swal.then(function (result) {
      if (result.isConfirmed) {
        (async function fafa() {
          try {
            if (type === "comment") {
              // console.log(token)
              const responseComment = await axios.post(api.reportComment, {
                token,
                idComment: e.idComment,
                causeReport: swal.getInput().value,
              });
              return;
            }
            if (type === "user") {
              const responseUser = await axios.post(api.reportUser, {
                token,
                idUser: e.idUser,
                causeReport: swal.getInput().value,
              });
              return;
            } else {
              const response = await axios.post(api.reportPost, {
                token,
                idPost: e.idPost,
                causeReport: swal.getInput().value,
              });
              return;
            }
          } catch (error) {
            const swal2 = Swal.fire({
              title: "WARNING",
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: "Ok",
              confirmButtonColor: "#dc3741",
              icon: "info",
              text: "You already reported this post",
            });
            if (type === "comment") {
              swal2.update({ text: "You already reported this comment" });
            }
            if (type === "user") {
              swal2.update({ text: "You already reported this user" });
            }
          }
        })();
      }
    });
  }

  // VER SOLAMENTE SUS PROPIOS POSTS SI ES ARTISTA

  const ownPosts = useSelector((state) => state.ownPosts);
  useEffect(() => {
    user.typeUser === "Artist" && dispatch(getOwnPosts(user.userName));
  }, [user]);

  useEffect(() => {
    token && user.typeUser !== "Artist" && dispatch(getAllPost(token));
  }, [token]);

  // EDITAR POST

  const handleEdit = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const [editPost, setEditPost] = useState({
    contentPost: null,
    idPost: null,
    linkContent: null,
    typeOfPost: null,
  });

  async function sendPost() {
    await axios.post(api.userUpdatePost, {
      ...editPost,
      contentPost: editPost.contentPost.trim(),
    });
    setTimeout(function () {
      dispatch(getOwnPosts(user.userName));
    }, 1000);
  }

  return (
    <div className="container-fluid">
      <div className={styles.containerArtist}>
        <div className={styles.glowOnHover}>
          <Link
            to="/profile"
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: "large",
              fontWeight: "bold",
              marginTop: "5%",
              marginBottom: "5%",
              marginLeft: "5%",
            }}
          >
            Get premium now so you don't miss out on anything!
          </Link>
          <div>
            {fakePosts.map((e) => {
              return (
                <Card
                  style={{
                    width: "90%",
                    height: "90%",
                  }}
                  color="bg-light"
                  className={styles.backgroundPostPremium}
                  key={e.token}
                >
                  <CardBody>
                    <CardTitle tag="h5">{user.username}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {e.content}
                    </CardSubtitle>
                  </CardBody>
                  <div className={styles.img}>
                    <img alt="img" src={e.image} height="250px" width="300px" />
                  </div>
                  <CardLink
                    href={e.link}
                  >{`LINK DEL POST : ${e.link}`}</CardLink>
                </Card>
              );
            })}
          </div>
        </div>

        <div className={styles.center}>
          {user.typeUser === "Artist" || user.userName === "primoro12" ? (
            <div className={styles.newPost}>
              <form>
                <div className={styles.divTextarea}>
                  <h3>Add new post</h3>
                  <Input
                    style={{ width: "50em", height: "6em" }}
                    color="bg-light"
                    placeholder="Tell your fans something new in no more than 200 characters!."
                    //className={styles.textarea}
                    name="contentPost"
                    maxlength="200"
                    value={input.contentPost}
                    type="textarea"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.buttons}>
                  {/* <Input
                    accept="image/png,image/jpeg"
                    type="file"
                    name="imagePost"
                    onChange={handleSearchImage}
                  /> */}
                  <Input
                    style={{ width: "38em", height: "2.5em" }}
                    onChange={handleChange}
                    type="url"
                    name="linkContent"
                    value={input.linkContent}
                    placeholder="Insert URL 🔗"
                  />
                  <Input
                    style={{ width: "7em", height: "2.5em" }}
                    type="select"
                    name="select"
                    value={input.select}
                    onChange={(e) => handlePremiumPost(e)}
                  >
                    <option value="Standard">Standard Post</option>
                    <option value="Premium">Premium Post</option>
                  </Input>

                  <Button
                    disabled={
                      input.contentPost.trim().length > 0 ? false : true
                    }
                    style={{ width: "5em", height: "2.5em" }}
                    color="primary"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Post
                  </Button>
                </div>
              </form>
              <div className={styles.postsArtist}>
                YOUR POSTS
                <div className={styles.post}>
                  {ownPosts.length > 0 &&
                    ownPosts.map((e) => {
                      return (
                        <Card
                          style={{
                            //marginLeft: "4em",
                            width: "100%",
                            height: "50%",
                            minHeight: "10em",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          className={styles.backgroundOwnPost}
                          key={e.idPost}
                        >
                          <CardBody>
                            <div className={styles.iconsTop}>
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
                              <Button
                                style={{
                                  background: "white",
                                  border: "0px",
                                }}
                                onClick={() => {
                                  setShowModal(!showModal);
                                  setEditPost({
                                    contentPost: e.contentPost,
                                    idPost: e.idPost,
                                    linkContent: e.linkContent,
                                    typeOfPost: e.typeOfPost,
                                  });
                                }}
                              >
                                <FcEditImage
                                  style={{
                                    marginBottom: "0.5em",
                                    marginLeft: "0.5em",
                                    width: "1.5em",
                                    height: "1.5em",
                                  }}
                                />
                              </Button>
                            </div>
                            <CardTitle
                              className={styles.topArtist}
                              style={{
                                color: "black",
                                // display: "flex",
                                // justifyContent: "flex-start",
                                marginLeft: "-570px",
                              }}
                              tag="h7"
                            >
                              <img
                                className={styles.profileImg}
                                src={`${api.getPhotoUser}${user.userName}`}
                                alt=""
                              ></img>
                              {e.User.userName === user.userName ? (
                                `@${e.User.userName}`
                              ) : (
                                <Link
                                  className={styles.userNameArtist}
                                  to={`/profile/${e.User.userName}`}
                                  onClick={() =>
                                    dispatch(
                                      getUseProfile(token, e.User.userName)
                                    )
                                  }
                                  style={{ marginTop: "100px" }}
                                >
                                  {`@${e.User.userName}`}
                                </Link>
                              )}
                              <div
                                style={{ display: "inline-block" }}
                                className={styles.date}
                              >
                                {e.datePost}
                              </div>
                              <div
                                style={{
                                  display: "inline-block",
                                  color: "white",
                                  background: "grey",
                                  borderRadius: "0.5em",
                                  fontSize: "11px",
                                  marginLeft: "5px",
                                  padding: "2px",
                                }}
                              >
                                {e.typeOfPost}
                              </div>
                            </CardTitle>
                            <CardSubtitle
                              style={{ marginTop: "10px" }}
                              className="mb-2 text-muted"
                              tag="h6"
                            >
                              {e.contentPost}
                            </CardSubtitle>
                          </CardBody>
                          {e.imagePost && (
                            <div className={styles.imgPost}>
                              <img
                                src={e.imagePost}
                                class="img-fluid"
                                alt="Responsive"
                              />
                            </div>
                          )}
                          <div className={styles.icons}>
                            {/* <CardLink href={e.linkContent}> */}
                            <FcLink
                              onClick={() => onClickContent(e.linkContent)}
                              style={{
                                marginBottom: "0.4em",
                                width: "2em",
                                height: "2em",
                              }}
                            />
                            {/* </CardLink> */}
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
                              <FcLike
                                style={{
                                  width: "2em",
                                  height: "2em",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2.5em",
                                marginRight: "1em",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  paddingRight: "0.5em",
                                }}
                              >
                                {e.Comments ? e.Comments.length : "0"}
                              </span>
                              <FcComments
                                style={{
                                  width: "2em",
                                  height: "2em",
                                }}
                                onClick={() => {
                                  setViewPost({ ...e });
                                  dispatch(getAllComments(e.idPost));
                                  handleShowModalComments();
                                  setCommentInput({
                                    ...commentInput,
                                    idPost: e.idPost,
                                    token: token,
                                  });
                                  setSlicer(3);
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
                <Modal isOpen={showModal}>
                  <ModalHeader toggle={() => setShowModal(!showModal)}>
                    ✏ Edit your post
                  </ModalHeader>
                  <ModalBody>
                    Edit the content:
                    <Input
                      type="textarea"
                      defaultValue={editPost.contentPost}
                      name="contentPost"
                      onChange={(e) => handleEdit(e)}
                    ></Input>
                    <br></br>
                    Edit the embedded link:
                    <Input
                      type="text"
                      name="linkContent"
                      defaultValue={editPost.linkContent}
                      onChange={(e) => handleEdit(e)}
                    ></Input>
                    <br></br>
                    Change the post type:
                    <Input
                      type="select"
                      name="typeOfPost"
                      defaultValue={editPost.typeOfPost}
                      onChange={(e) => handleEdit(e)}
                    >
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                    </Input>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      disabled={
                        editPost.contentPost &&
                        editPost.contentPost.trim().length > 0
                          ? false
                          : true
                      }
                      onClick={() => {
                        sendPost();
                        setShowModal(!showModal);
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => setShowModal(!showModal)}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              {/* <br></br>
              <div className={styles.concertAndEventPost}>
                <form className={styles.newConcert}>
                  <h3>Add new concert</h3>
                  <input
                    type="textarea"
                    name="contentConcert"
                    placeholder="Describe some thing about the concert."
                  />
                  <input
                    accept="image/png,image/jpeg"
                    type="file"
                    name="imageConcert"
                  />
                  <input type="date" name="dateConcert" />
                  <input
                    type="text"
                    name="textConcert"
                    placeholder="Name the country and the stadium or place."
                  />
                </form>
                <form className={styles.newEvent}>
                  <h3>Add new event</h3>
                  <input
                    type="textarea"
                    name="contentEvent"
                    placeholder="Describe some thing about the event."
                  />
                  <input
                    accept="image/png,image/jpeg"
                    type="file"
                    name="imageEvent"
                  />
                  <input type="date" name="dateEvent" />
                  <input
                    type="text"
                    name="textEvent"
                    placeholder="Name the place or where is going to be the event."
                  />
                </form>
              </div> */}
            </div>
          ) : (
            <div className={styles.posts}>
              <div className={styles.post} style={{ marginTop: "1.5em" }}>
                {posts &&
                  posts.map((e) => {
                    // console.log(e)
                    //console.log(user)
                    if (
                      e.typeOfPost === "Premium" &&
                      user.typeUser !== "Premium"
                    ) {
                      return (
                        <Card
                          style={{
                            width: "100%",
                            height: "43%",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          className={styles.noPremium}
                          key={e.token}
                        >
                          <CardBody>
                            <CardTitle
                              style={{
                                color: "black",
                                marginLeft: "-450px",
                              }}
                              tag="h7"
                              className={styles.top}
                            >
                              <img
                                className={styles.profileImg}
                                src={`${api.getPhotoUser}${e.nameUser}`}
                                alt=""
                              ></img>
                              `@${e.nameUser}`
                              <div
                                style={{ display: "inline-block" }}
                                className={styles.date}
                              >
                                {e.datePost}
                              </div>
                            </CardTitle>
                            <CardSubtitle
                              style={{ marginTop: "10px" }}
                              className="mb-2 text-muted"
                              tag="h6"
                            >
                              BECAME PREMIUM TO SEE THIS POST!
                            </CardSubtitle>
                          </CardBody>
                          {e.imagePost && (
                            <div className={styles.imgPost}>
                              <img
                                src={e.imagePost}
                                class="img-fluid"
                                alt="Responsive"
                              />
                            </div>
                          )}
                          <div className={styles.icons}>
                            {/* <CardLink href={e.linkContent}> */}
                            <FcLink
                              // onClick={() => onClickContent(e.linkContent)}
                              style={{
                                marginBottom: "0.4em",
                                width: "2em",
                                height: "2em",
                              }}
                            ></FcLink>
                            {/* </CardLink> */}
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
                                  //     falseDislike({
                                  //       index: posts.indexOf(e),
                                  //       userName: user.userName,
                                  //     })
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
                            <div
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2em",
                                marginRight: "1em",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  paddingRight: "0.5em",
                                }}
                              >
                                {e.Comments ? e.Comments.length : "0"}
                              </span>
                              <FcComments
                                style={{
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
                          </div>
                        </Card>
                      );
                    } else {
                      return (
                        <Card
                          style={{
                            width: "100%",
                            height: "43%",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          className={styles.backgroundPost}
                          key={e.token}
                        >
                          <CardBody>
                            <CardTitle
                              style={{
                                color: "black",
                                marginLeft: "-450px",
                              }}
                              tag="h7"
                              className={styles.top}
                            >
                              <img
                                className={styles.profileImg}
                                src={`${api.getPhotoUser}${e.nameUser}`}
                                alt=""
                              ></img>
                              {e.nameUser === user.userName ? (
                                `@${e.nameUser}`
                              ) : (
                                <Link
                                  className={styles.userName}
                                  to={`/profile/${e.nameUser}`}
                                  onClick={() =>
                                    dispatch(getUseProfile(token, e.nameUser))
                                  }
                                >
                                  {`@${e.nameUser}`}
                                </Link>
                              )}
                              <div
                                style={{ display: "inline-block" }}
                                className={styles.date}
                              >
                                {e.datePost}
                              </div>
                              <div
                                style={{
                                  display: "inline-flex",
                                  marginRight: "-640px",
                                  marginLeft: "650px",
                                }}
                              >
                                <GoReport
                                  style={{ height: "25px", width: "50px" }}
                                  onClick={() => {
                                    setViewPost({ ...e });
                                    openReport(e);
                                  }}
                                />
                              </div>
                            </CardTitle>
                            <CardSubtitle
                              style={{ marginTop: "10px" }}
                              className="mb-2 text-muted"
                              tag="h6"
                            >
                              {e.contentPost}
                            </CardSubtitle>
                          </CardBody>
                          {e.imagePost && (
                            <div className={styles.imgPost}>
                              <img
                                src={e.imagePost}
                                class="img-fluid"
                                alt="Responsive"
                              />
                            </div>
                          )}
                          <div className={styles.icons}>
                            {/* <CardLink href={e.linkContent}> */}
                            <FcLink
                              onClick={() => onClickContent(e.linkContent)}
                              style={{
                                marginBottom: "0.4em",
                                width: "2em",
                                height: "2em",
                              }}
                            ></FcLink>
                            {/* </CardLink> */}
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
                                  onClick={() => {
                                    dispatch(
                                      falseDislike({
                                        index: posts.indexOf(e),
                                        userName: user.userName,
                                      })
                                    );
                                    dispatch(
                                      dislike({ token, idPost: e.idPost })
                                    );
                                  }}
                                />
                              ) : (
                                <FcLikePlaceholder
                                  style={{
                                    width: "2em",
                                    height: "2em",
                                  }}
                                  onClick={() => {
                                    dispatch(
                                      falseLike({
                                        index: posts.indexOf(e),
                                        userName: user.userName,
                                      })
                                    );
                                    dispatch(like({ token, idPost: e.idPost }));
                                  }}
                                />
                              )}
                            </div>
                            <div
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2em",
                                marginRight: "1em",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  paddingRight: "0.5em",
                                }}
                              >
                                {e.Comments ? e.Comments.length : "0"}
                              </span>
                              <FcComments
                                style={{
                                  width: "2em",
                                  height: "2em",
                                }}
                                onClick={() => {
                                  setViewPost({ ...e });
                                  dispatch(getAllComments(e.idPost));
                                  handleShowModalComments();
                                  setCommentInput({
                                    ...commentInput,
                                    idPost: e.idPost,
                                    token: token,
                                  });
                                  setSlicer(3);
                                }}
                              />
                            </div>
                          </div>
                        </Card>
                      );
                    }
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MODAL PARA VER COMENTARIOS */}
      {viewPost && (
        <Modal centered isOpen={showModalComments} scrollable>
          <ModalHeader>
            <Button
              color="transparent"
              onClick={() => {
                handleShowModalComments();
                setViewPost(null);
                setCommentInput({ ...commentInput, commentContent: "" });
              }}
              size="sm"
              style={{ marginLeft: "425px" }}
            >
              X
            </Button>
            <Card
              style={{
                marginLeft: "0.5em",
                width: "40%",
                height: "40%",
                minWidth: "22em",
              }}
              color="light"
              className={styles.backgroundPost}
              key={viewPost.idPost}
            >
              <CardBody>
                <CardTitle style={{ color: "orange" }} tag="h7">
                  <img
                    // className={styles.profileImg}
                    style={{ width: "50px", height: "50px", borderRadius: "50px", border: "2px solid gray", marginRight: "15px"}}
                    src={`${api.getPhotoUser}${viewPost.nameUser}`}
                    alt=""
                  ></img>
                  {viewPost.nameUser ? viewPost.nameUser : user.userName}
                </CardTitle>
                <CardTitle
                  style={{
                    color: "blue",
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "small",
                  }}
                >
                  {viewPost.datePost}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {viewPost.contentPost}
                </CardSubtitle>
              </CardBody>
              {viewPost.imagePost && (
                <div className={viewPost.img}>
                  <img
                    src={viewPost.imagePost}
                    class="img-fluid"
                    alt="Responsive"
                  />
                </div>
              )}
              <div className={styles.icons}>
                <CardLink href={viewPost.linkContent}>
                  <FcLink
                    style={{
                      marginBottom: "0.2em",
                      marginRight: "1em",
                      width: "2em",
                      height: "2em",
                    }}
                  ></FcLink>
                </CardLink>
              </div>
            </Card>
          </ModalHeader>
          <ModalBody>
            {comments.length > 0 ? (
              <>
                {comments.slice(0, slicer).map((e) => (
                  <Card key={e.idComment} style={{ marginBottom: "0.5em" }}>
                    <CardBody>
                      <CardTitle tag="h5">
                        <img
                          // className={styles.profileImg}
                          style={{ width: "50px", height: "50px", borderRadius: "50px", border: "2px solid gray", marginRight: "15px"}}
                          src={`${api.getPhotoUser}${e.userNameComment}`}
                          alt=""
                        ></img>
                        {user.userName === e.userNameComment ? (
                          e.userNameComment
                        ) : (
                          <Link to={`/profile/${e.userNameComment}`}>
                            @{e.userNameComment}
                          </Link>
                        )}
                        {e.userNameComment === user.userName ? null : (
                          <div
                            style={{
                              display: "inline-flex",
                              marginLeft: "300px",
                            }}
                          >
                            <GoReport
                              style={{ height: "25px", width: "50px" }}
                              onClick={() => {
                                openReport(e, "comment");
                              }}
                            />
                          </div>
                        )}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        style={{ fontSize: "small" }}
                      >
                        {e.dateComment}
                      </CardSubtitle>
                      <CardText>{e.commentContent}</CardText>
                    </CardBody>
                  </Card>
                ))}
                {comments.slice(0, slicer + 3).length !==
                  comments.slice(0, slicer).length && (
                  <p
                    className={styles.loadMoreComments}
                    onClick={() => setSlicer(slicer + 3)}
                  >
                    🖱 Click me to load more comments...
                  </p>
                )}
              </>
            ) : (
              <p style={{ textAlign: "center" }}>No comments yet... ☹</p>
            )}
          </ModalBody>
          {user.typeUser === "Premium" && (
            <ModalFooter>
              <br></br>
              <Input
                name="commentContent"
                type="textarea"
                placeholder="Write a comment..."
                onChange={(e) =>
                  setCommentInput({
                    ...commentInput,
                    [e.target.name]: e.target.value,
                  })
                }
                value={commentInput.commentContent}
              ></Input>
              <Button
                color="success"
                size="sm"
                outline
                style={{ marginLeft: "82%", marginTop: "10px" }}
                disabled={
                  commentInput.commentContent.trim() === "" ? true : false
                }
                onClick={() => {
                  dispatch(userNewComment(commentInput));
                  dispatch(
                    falseAddComment(
                      posts.findIndex((e) => e.idPost === viewPost.idPost)
                    )
                  );
                  setCommentInput({ ...commentInput, commentContent: "" });
                }}
              >
                Comment!
              </Button>
            </ModalFooter>
          )}
        </Modal>
      )}
    </div>
  );
}
