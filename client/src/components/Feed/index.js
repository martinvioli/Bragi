import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  getAllComments,
  getToken,
  getUser,
  userNewComment,
  userNewPost,
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
} from "react-icons/fc";
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

// const posts = [
//   {
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
//     link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
//     image: "https://picsum.photos/318/180",
//   },
//   {
//     content:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
//     link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
//     image: "https://picsum.photos/318/180",
//   },
//   {
//     content:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
//     link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
//     image: "https://picsum.photos/318/180",
//   },
//   {
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae commodi, voluptates ut dolorem a ea aut perferendis dolor iste nemo doloribus nulla animi fuga, reiciendis quis tempora quia, explicabo",
//     link: "https://www.youtube.com/watch?v=SAUvlkTDMM4",
//     image: "https://picsum.photos/318/180",
//   },
// ];

export default function Feed() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    contentPost: "",
    token: "",
    linkContent: "",
    imagePost: "",
  });
  const [showModal, setShowModal] = useState(false);

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
    // setTimeout(function () {
    //   dispatch(getAllPost());
    // }, 1000);
    dispatch(getAllPost());
    if (!userToken) {
      navigate("/");
    }
  }, []);

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
    console.log(input);
    dispatch(userNewPost(input));
    dispatch(getAllPost());
    setTimeout(function () {
      dispatch(getAllPost());
    }, 1000);
    setInput({
      token: token,
      contentPost: "",
      linkContent: "",
      imagePost: "",
    });
  }
  const handleDelete = (e) => {
    console.log(e.idPost);
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
          dispatch(getAllPost());
        }, 1000);
      }
    });
  };

  const handleEdit = (e) => {
    setShowModal(true);
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
    setShowModalComments(!showModal);
  }

  const comments = useSelector((state) => state.comments);

  const [commentInput, setCommentInput] = useState({
    commentContent: "",
    token: null,
    idPost: null,
  });

  const [slicer, setSlicer] = useState(3);

  console.log(comments);

  return (
    <div className="container-fluid">
      <div className={styles.container}>
        <div className={styles.premiumSector}>Sector Premium</div>
        <div className={styles.center}>
          {user.typeUser === "Artist" ? (
            <div className={styles.newPost}>
              <form>
                <h3>Add new post</h3>
                <div className={styles.divTextarea}>
                  <Input
                    style={{ width: "50em", height: "6em" }}
                    color="bg-light"
                    placeholder="tell us about something that has happened to you with music..."
                    //className={styles.textarea}
                    name="contentPost"
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
                    style={{ width: "45em", height: "2.5em" }}
                    onChange={handleChange}
                    type="url"
                    name="linkContent"
                    value={input.linkContent}
                    placeholder="Insert URL 🔗"
                  />
                  <Button
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
              <div className={styles.posts}>
                See All Post
                <div className={styles.post}>
                  {posts.length &&
                    posts.map((e) => {
                      return (
                        <Card
                          style={{
                            //marginLeft: "4em",
                            width: "50%",
                            height: "50%",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          className={styles.backgroundPost}
                          key={e.idPost}
                        >
                          <CardBody>
                            <div className={styles.icons}>
                              <Button
                                style={{
                                  background: "white",
                                  border: "0px",
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
                                onClick={() => handleEdit(e)}
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
                              style={{
                                color: "blue",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                              }}
                              tag="h6"
                            >
                              {e.datePost}
                              <br />
                              {`@${user.userName}`}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              {e.contentPost}
                            </CardSubtitle>
                          </CardBody>
                          {e.imagePost && (
                            <div className={styles.img}>
                              <img
                                src={e.imagePost}
                                class="img-fluid"
                                alt="Responsive"
                              />
                            </div>
                          )}

                          <div className={styles.icons}>
                            <CardLink href={e.linkContent}>
                              <FcLink
                                style={{
                                  marginBottom: "0.4em",
                                  width: "1.5em",
                                  height: "1.5em",
                                }}
                              ></FcLink>
                            </CardLink>
                            <FcLike
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2.5em",
                                width: "1.5em",
                                height: "1.5em",
                              }}
                            />
                            <CardLink href={e.linkContent}>
                              <FcComments
                                style={{
                                  marginBottom: "0.4em",
                                  marginLeft: "2.5em",
                                  width: "1.5em",
                                  height: "1.5em",
                                }}
                              />
                            </CardLink>
                            <FcRedo
                              style={{
                                marginBottom: "0.4em",
                                marginLeft: "2em",
                                marginRight: "1em",
                                width: "1.5em",
                                height: "1.5em",
                              }}
                            />
                          </div>
                        </Card>
                      );
                    })}
                </div>
                <Modal isOpen={showModal}>
                  <ModalHeader toggle={function noRefCheck() {}}>
                    Edit your post
                  </ModalHeader>
                  <ModalBody>
                    aca van los inputs a editar
                    <Input
                      style={{ width: "20em", height: "3em" }}
                      color="bg-light"
                      //className={styles.textarea}
                      name="contentPost"
                      value={input.contentPost}
                      type="textarea"
                      onChange={(e) => handleChange(e)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary">Do Something</Button>{" "}
                    <Button>Cancel</Button>
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
              <p>See Alls Posts</p>
              <div className={styles.post}>
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
                        className={styles.backgroundPost}
                        key={e.token}
                      >
                        <CardBody>
                          <CardTitle
                            style={{
                              color: "orange",
                            }}
                            tag="h7"
                          >
                            {e.User.userName}
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
                          <div className={styles.img}>
                            <img
                              src={e.imagePost}
                              class="img-fluid"
                              alt="Responsive"
                            />
                          </div>
                        )}
                        <div className={styles.icons}>
                          <CardLink href={e.linkContent}>
                            <FcLink
                              style={{
                                marginBottom: "0.4em",
                                width: "2em",
                                height: "2em",
                              }}
                            ></FcLink>
                          </CardLink>
                          <FcLike
                            style={{
                              marginBottom: "0.4em",
                              marginLeft: "2.5em",
                              width: "2em",
                              height: "2em",
                            }}
                          />
                          <FcRedo
                            style={{
                              marginBottom: "0.4em",
                              marginLeft: "2em",
                              marginRight: "1em",
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
                      </Card>
                    );
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
              color="danger"
              onClick={() => {
                handleShowModalComments();
                setViewPost(null);
                setCommentInput({ ...commentInput, commentContent: "" });
              }}
              size="sm"
              style={{ marginLeft: "94%" }}
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
              key={viewPost.token}
            >
              <CardBody>
                <CardTitle style={{ color: "orange" }} tag="h7">
                  {viewPost.User.userName}
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
                      marginBottom: "0.4em",
                      width: "2em",
                      height: "2em",
                    }}
                  ></FcLink>
                </CardLink>
                <FcLike
                  style={{
                    marginBottom: "0.4em",
                    marginLeft: "2.5em",
                    marginRight: "1em",
                    width: "2em",
                    height: "2em",
                  }}
                />
              </div>
            </Card>
          </ModalHeader>
          <ModalBody>
            {comments.length > 0 ? (
              <>
                {comments.slice(0, slicer).map((e) => (
                  <Card key={e.idComment} style={{ marginBottom: "0.5em" }}>
                    <CardBody>
                      <CardTitle tag="h5">{e.userNameComment}</CardTitle>
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
              <p>No comments yet...</p>
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
                    [e.target.name]: e.target.value.trim(),
                  })
                }
                value={commentInput.commentContent}
              ></Input>
              <Button
                color="success"
                size="sm"
                outline
                style={{ marginLeft: "82%", marginTop: "10px" }}
                disabled={commentInput.commentContent === "" ? true : false}
                onClick={() => {
                  dispatch(userNewComment(commentInput));
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
