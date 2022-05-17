import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardBody,
  Card,
  CardFooter,
  CardText,
  CardTitle,
  CardSubtitle,
  CardLink,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Input,
} from "reactstrap";
import {
  getPhotoUser,
  getUseProfile,
  getUser,
  postReeplacer,
  like,
  dislike,
  falseDislike,
  falseLike,
  getAllComments,
  userNewComment,
  listFollowed,
  falseAddComment,
  falseAddComentProfile,
  listFollowers,
} from "../../redux/actionCreators";
import EditProfile from "../EditProfile";
import styles from "./Profile.module.css";
import {
  FcEditImage,
  FcFullTrash,
  FcLike,
  FcRedo,
  FcLink,
  FcComments,
  FcLikePlaceholder,
} from "react-icons/fc";
import { BiEdit } from "react-icons/bi";

function Profile(props) {
  var user = useSelector((state) => state.user);
  const profileImage = useSelector((state) => state.profileImage);
  const listFolloweds = useSelector((state) => state.listFollowed);
  const listFollowerss = useSelector((state) => state.listFollowers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);
  const [token, setToken] = useState();
  const [showModalFollower, setShowModalFollower] = useState(false);
  const [showModalFollowed, setShowModalFollowed] = useState(false);

  useEffect(() => {
    console.log(user);
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    setToken(userToken);
    dispatch(getUser(userToken));
    dispatch(getPhotoUser(user.userName));
    dispatch(listFollowed(user.userName));
    dispatch(listFollowers(user.userName));
    if (!user.name) {
      navigate("/");
    }
    if (userToken) {
    }
  }, []);

  user = {
    ...user,
    description: null,
  };

  console.log(listFollowed);

  const handleShowEditProfile = (e) => setShowEditProfile(!showEditProfile);

  //// VER PERFIL AJENO

  const { userName } = useParams();

  const posts = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.userProfile);
  useEffect((token) => {
    props.visitant && dispatch(getUseProfile(token, userName));
  }, []);
  useEffect(() => {
    dispatch(postReeplacer());
  }, [posts !== profile.Posts]);

  // MODAL COMENTARIOS PARA PERFIL AJENO
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

  console.log(viewPost);

  return props.visitant ? (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          marginTop: "8em",
        }}
      >
        <div
          style={{
            background: "#2c292a",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "35em",
            width: "20em",
            marginRight: "0em",
          }}
        >
          <img className={styles.profileImg} src={profileImage} alt=""></img>
          {profile.name ? (
            <div>
              <div>
                <div className={styles.name}>
                  {profile.name + " " + profile.lastName}
                </div>
                <div className={styles.name}>@{profile.userName}</div>
                <h3>
                  {profile.nameTypeUser === "Standard"
                    ? "Fan"
                    : profile.nameTypeUser}
                </h3>
                <div className={styles.description}>{profile.description}</div>
              </div>
            </div>
          ) : null}
        </div>
        <br></br>
        {profile.nameTypeUser === "Artist" ? (
          <>
            <div
              className={styles.post}
              style={{
                width: "32em",
                padding: 0,
                margin: 0,
                overflowY: "auto",
                maxHeight: "30em",
              }}
            >
              {posts &&
                posts.map((e) => {
                  return (
                    <Card
                      style={{
                        width: "fitcontent",
                        minHeight: "8em",
                        maxHeight: "15em",
                        minWidth: "25em",
                        marginBottom: "1em",
                        marginRight: "1em",
                        filter:
                          e.typeOfPost === "Premium" &&
                          user.typeUser !== "Premium"
                            ? "blur(0.1rem)"
                            : "blur(0)",
                        background:
                          e.typeOfPost === "Premium" &&
                          user.typeUser !== "Premium"
                            ? "linear-gradient(45deg, #795300, #b28405, #efb810, #f9db5c, #ffff94, #dd9202)"
                            : null,
                      }}
                      color="bg-light"
                      className={styles.backgroundPost}
                      key={e.idPost}
                    >
                      <CardBody>
                        <CardTitle
                          style={{
                            color: "orange",
                          }}
                          tag="h7"
                        >
                          {e.nameUser}
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
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="h6"
                          style={{
                            textAlign:
                              e.typeOfPost === "Premium" &&
                              user.typeUser !== "Premium"
                                ? "center"
                                : null,
                          }}
                        >
                          {e.typeOfPost === "Premium" &&
                          user.typeUser !== "Premium"
                            ? "BECAME PREMIUM TO SEE THIS POST!"
                            : e.contentPost}
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
                        {e.typeOfPost === "Premium" &&
                        user.typeUser !== "Premium" ? null : e.linkContent ? (
                          <CardLink href={e.linkContent}>
                            <FcLink
                              style={{
                                marginBottom: "0.4em",
                                width: "2em",
                                height: "2em",
                              }}
                            ></FcLink>
                          </CardLink>
                        ) : null}
                        <div
                          style={{
                            marginBottom: "0.4em",
                            marginLeft: "2.5em",
                          }}
                        >
                          <span
                            style={{ color: "black", paddingRight: "0.5em" }}
                          >
                            {e.Likes ? e.Likes.length : "0"}
                          </span>
                          {e.Likes.some((e) => e.userName === user.userName) ? (
                            <FcLike
                              style={{
                                width: "2em",
                                height: "2em",
                              }}
                              onClick={() => {
                                if (
                                  e.typeOfPost === "Premium" &&
                                  user.typeUser !== "Premium"
                                ) {
                                } else {
                                  dispatch(
                                    falseDislike({
                                      index: posts.indexOf(e),
                                      userName: user.userName,
                                    })
                                  );
                                  dispatch(
                                    dislike({ token: token, idPost: e.idPost })
                                  );
                                }
                              }}
                            />
                          ) : (
                            <FcLikePlaceholder
                              style={{
                                width: "2em",
                                height: "2em",
                              }}
                              onClick={() => {
                                if (
                                  e.typeOfPost === "Premium" &&
                                  user.typeUser !== "Premium"
                                ) {
                                } else {
                                  dispatch(
                                    falseLike({
                                      index: posts.indexOf(e),
                                      userName: user.userName,
                                    })
                                  );
                                  dispatch(
                                    like({ token: token, idPost: e.idPost })
                                  );
                                }
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
                            style={{ color: "black", paddingRight: "0.5em" }}
                          >
                            {e.Comments ? e.Comments.length : "0"}
                          </span>
                          <FcComments
                            style={{
                              width: "2em",
                              height: "2em",
                            }}
                            onClick={() => {
                              if (
                                e.typeOfPost === "Premium" &&
                                user.typeUser !== "Premium"
                              ) {
                              } else {
                                setViewPost({ ...e });
                                dispatch(getAllComments(e.idPost));
                                handleShowModalComments();
                                setCommentInput({
                                  ...commentInput,
                                  idPost: e.idPost,
                                  token: token,
                                });
                                setSlicer(3);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </>
        ) : (
          <div className={styles.fan}>
            <h1>FOLLOWING</h1>
          </div>
        )}
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
              key={viewPost.idPost}
            >
              <CardBody>
                <CardTitle style={{ color: "orange" }} tag="h7">
                  {viewPost.User ? viewPost.User.userName : user.userName}
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
                        {user.userName === e.userNameComment ? (
                          e.userNameComment
                        ) : (
                          <Link to={`/profile/${e.userNameComment}`}>
                            {e.userNameComment}
                          </Link>
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
                  dispatch(
                    falseAddComentProfile(
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
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.top}>
            <img className={styles.profileImg} src={profileImage} alt=""></img>
            <div>
              {showEditProfile ? (
                <EditProfile
                  showModal={showEditProfile}
                  handleShowModal={handleShowEditProfile}
                />
              ) : (
                <div className={styles.editButton}>
                  <BiEdit
                    style={{ width: "40px", height: "40px" }}
                    className="secondary"
                    onClick={handleShowEditProfile}
                  >
                    Wanna Edit Your Profile
                  </BiEdit>
                </div>
              )}
            </div>
          </div>
          {/* Followeds */}
          {user.name ? (
            <div className={styles.nameNData}>
              <div>
                <div className={styles.name}>
                  {user.name + " " + user.lastName}
                </div>
                <div className={styles.userName}>@{user.userName}</div>
              </div>
            </div>
          ) : null}
          <div className={styles.followList}>
            <div className={styles.followeds}>
              <div>
                <Button
                  style={{
                    color: "white",
                    background: "transparent",
                    border: "transparent",
                  }}
                  onClick={function noRefCheck() {
                    setShowModalFollowed(true);
                  }}
                >
                  Followeds
                </Button>
                <Modal
                  isOpen={showModalFollowed}
                  fade={true}
                  toggle={function noRefCheck() {}}
                >
                  <ModalHeader
                    toggle={function noRefCheck() {
                      setShowModalFollowed(false);
                    }}
                  >
                    Followeds
                  </ModalHeader>
                  <ModalBody>
                    {listFolloweds.map((e) => {
                      console.log(e);
                      return (
                        <div>
                          <Link
                            to={`/profile/${e.userNameFollowed}`}
                            style={{ color: "black", margin: "10px" }}
                            onClick={() =>
                              dispatch(getUseProfile(token, e.userNameFollowed))
                            }
                          >
                            {e.userNameFollowed}
                          </Link>
                          <br></br>
                        </div>
                      );
                    })}
                  </ModalBody>
                </Modal>
              </div>
              {listFolloweds.length}
            </div>
            {/* Followers */}
            <div className={styles.followers}>
              <Button
                style={{
                  color: "white",
                  background: "transparent",
                  border: "transparent",
                }}
                onClick={function noRefCheck() {
                  setShowModalFollower(true);
                }}
              >
                Followers
              </Button>
              <Modal
                isOpen={showModalFollower}
                fade={true}
                toggle={function noRefCheck() {}}
              >
                <ModalHeader
                  toggle={function noRefCheck() {
                    setShowModalFollower(false);
                  }}
                >
                  Followers
                </ModalHeader>
                <ModalBody>
                  {listFollowerss.map((e) => {
                    console.log(e);
                    return (
                      <div>
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={profileImage}
                          alt="img"
                        />
                        <Link
                          to={`/profile/${e.userNameFollower}`}
                          style={{ color: "black" }}
                          onClick={() =>
                            dispatch(getUseProfile(token, e.userNameFollower))
                          }
                        >
                          {e.userNameFollower}
                        </Link>
                      </div>
                    );
                  })}
                </ModalBody>
              </Modal>
              <br></br>
              {listFollowerss.length}
            </div>
          </div>
          {user.name ? (
            <div>
              <h3 style={{ color: "#dd9202", marginTop: "-30px" }}>
                {user.typeUser === "Standard" ? "Fan" : user.typeUser}
              </h3>
              <div className={styles.description}>{user.description}</div>
            </div>
          ) : null}
        </div>
        <br></br>
      </div>
      {user.typeUser === "Artist" ? (
        <>
          <div className={styles.artist}></div>
        </>
      ) : (
        <div className={styles.fan}></div>
      )}
    </div>
  );
}

export default Profile;
