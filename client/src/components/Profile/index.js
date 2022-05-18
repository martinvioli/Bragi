import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardBody,
  Card,
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
import { GoReport } from "react-icons/go";
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
  unfollowUser,
  followUser,
} from "../../redux/actionCreators";
import EditProfile from "../EditProfile";
import styles from "./Profile.module.css";
import { FcLike, FcLink, FcComments, FcLikePlaceholder } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import api from "../../Utils";
import Swal from "sweetalert2";

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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //console.log(user);
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    setToken(userToken);
    dispatch(getUser(userToken));
    // if (!user.name) {
    //   navigate("/");
    // }
    // if (userToken) {
    // }
  }, []);

  useEffect(() => {
    dispatch(getPhotoUser(user.userName));
    dispatch(listFollowed(user.userName));
    dispatch(listFollowers(user.userName));
  }, [user]);

  //console.log(listFollowed);

  const handleShowEditProfile = (e) => setShowEditProfile(!showEditProfile);

  // VER PERFIL AJENO

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

  const image = !profileImage.includes("undefined") ? (
    <img className={styles.profileImg} src={profileImage} alt=""></img>
  ) : (
    (dispatch(getPhotoUser(user.userName)),
    (<img className={styles.profileImg} src={profileImage} alt=""></img>))
  );

  //console.log(profileImage);

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

  // useEffect(() => {

  // },[profileImage])

  const comments = useSelector((state) => state.comments);

  const [commentInput, setCommentInput] = useState({
    commentContent: "",
    token: null,
    idPost: null,
  });

  const [slicer, setSlicer] = useState(3);

  //// test

  useEffect(() => {
    dispatch(listFollowed(user.userName));
  }, [user]);
  var followed = useSelector((state) => state.listFollowed);

  return props.visitant ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className={styles.container}
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   gap: "1em",
        //   marginTop: "8em",
        // }}
      >
        <div
          className={styles.profile}
          // style={{
          //   background: "#2c292a",
          //   display: "flex",
          //   justifyContent: "center",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   maxHeight: "35em",
          //   width: "20em",
          //   marginRight: "0em",
          // }}
        >
          <div
            className={styles.editButton}
            style={{
              display: "inline-block",
              marginRight: "-60%",
              marginBottom: "-50px",
            }}
          >
            <GoReport
              style={{ height: "25px", width: "50px" }}
              onClick={() => {
                openReport(profile, "user");
              }}
            />
          </div>
          <img
            className={styles.profileImg}
            src={`${api.getPhotoUser}${profile.userName}`}
            alt=""
          ></img>
          {profile.name ? (
            <div>
              <div>
                <div className={styles.name}>
                  {profile.name + " " + profile.lastName}
                </div>
                <div className={styles.name}>@{profile.userName}</div>
                {followed.some(
                  (e) => e.userNameFollowed === profile.userName
                ) ? (
                  <Button
                    className={styles.unFollowBtn}
                    onClick={() => {
                      dispatch(
                        unfollowUser({
                          token,
                          unfollowedUsername: profile.userName,
                        })
                      );
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={styles.followBtn}
                    onClick={() =>
                      dispatch(
                        followUser({
                          token,
                          followedUsername: profile.userName,
                        })
                      )
                    }
                  >
                    Follow
                  </Button>
                )}
                <h3 style={{ marginBottom: "25px" }}>
                  {profile.nameTypeUser === "Standard" ? (
                    <div style={{ color: "#dd9202" }}>Fan</div>
                  ) : (
                    <div style={{ color: "#dd9202" }}>
                      {profile.nameTypeUser}
                    </div>
                  )}
                </h3>
                <div className={styles.description}>{profile.description}</div>
              </div>
            </div>
          ) : null}
        </div>
        <br></br>
      </div>
      <div>
        {profile.nameTypeUser === "Artist" ? (
          <>
            <h1
              style={{ color: "white", marginTop: "125px", marginLeft: "20px" }}
            >
              Posts of the Artist
            </h1>
            <div
              className={styles.postProfile}
              style={{
                width: "32em",
                padding: 0,
                margin: 0,
                overflowY: "auto",
                maxHeight: "30em",
                marginTop: "10px",
                marginLeft: "25px",
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
                        {/* <CardTitle
                          style={{
                            color: "orange",
                          }}
                          tag="h7"
                        >
                          @{e.User.userName}
                        </CardTitle> */}
                        <CardTitle
                          style={{
                            color: "gray",
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                          tag="h7"
                        >
                          {e.datePost}
                          <div
                            style={{
                              display: "inline-flex",
                              marginRight: "-640px",
                              marginLeft: "350px",
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
          <div className={styles.fan}>{/* <h1>FOLLOWING</h1> */}</div>
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
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50px",
                      border: "2px solid gray",
                      marginRight: "15px",
                    }}
                    src={`${api.getPhotoUser}${viewPost.User.userName}`}
                    alt=""
                  ></img>
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
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50px",
                            border: "2px solid gray",
                            marginRight: "15px",
                          }}
                          src={`${api.getPhotoUser}${e.userNameComment}`}
                          alt=""
                        ></img>
                        {user.userName === e.userNameComment ? (
                          e.userNameComment
                        ) : (
                          <Link to={`/profile/${e.userNameComment}`}>
                            {e.userNameComment}
                          </Link>
                        )}
                        {e.userNameComment !== user.userName && (
                          <div
                            style={{
                              display: "inline-flex",
                              // marginRight: "-640px",
                              marginLeft: "250px",
                            }}
                          >
                            <GoReport
                              style={{ height: "25px", width: "50px" }}
                              onClick={() => {
                                setViewPost({ ...e });
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
            {image}
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
                  Followed
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
                    Followed
                  </ModalHeader>
                  <ModalBody>
                    {listFolloweds.map((e) => {
                      ////console.log(e);
                      return (
                        <div>
                          <Link
                            to={`/profile/${e.userNameFollowed}`}
                            style={{ color: "black", margin: "10px" }}
                            onClick={() =>
                              dispatch(getUseProfile(token, e.userNameFollowed))
                            }
                          >
                            @{e.userNameFollowed}
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
                    //console.log(e);
                    return (
                      <div>
                        <Link
                          to={`/profile/${e.userNameFollower}`}
                          style={{ color: "black", margin: "1px" }}
                          onClick={() =>
                            dispatch(getUseProfile(token, e.userNameFollower))
                          }
                        >
                          @{e.userNameFollower}
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
