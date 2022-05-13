import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

function Profile(props) {
  var user = useSelector((state) => state.user);
  const profileImage = useSelector((state) => state.profileImage);
  const listFolloweds = useSelector((state) => state.listFollowed)
  const listFollowerss = useSelector((state) => state.listFollowers)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3);
  const [token, setToken] = useState();

  useEffect(() => {
    console.log(user)
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

  const postsTruchos = [
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

  var concerts = [
    {
      date: "20/03/2022",
      country: "EEUU",
      place: "National Stadium of Wisconsin",
    },
    {
      date: "23/05/2022",
      country: "Argentina",
      place: "Estadio La Plata",
    },
  ];

  var events = [
    {
      date: "20/01/2022",
      type: "Meet and greet",
      country: "EEUU",
      place: "Pub Bar Hellday",
    },
    {
      date: "23/05/2022",
      type: "Live broadcast",
      country: "International",
      place: "Twitch/BritneySpears",
    },
  ];

  var followed = [
    {
      name: "Taylor Swift",
      user: "taylorSwiftOK",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1353100170.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*",
    },
    {
      name: "Metallica",
      user: "metallica_rock",
      image:
        "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/c/b/e/3/cbe32534b5d42220e47b16a1a9c9c0dd.jpg",
    },
    {
      name: "Duki",
      user: "dukiGOAT",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/98/Duko_concierto.jpg",
    },
    {
      name: "Soda Stereo",
      user: "graciasTotales",
      image:
        "https://www.luminariastv.com/wp-content/uploads/2022/03/7595380A-F908-48CF-8DE4-D7D7FF80D181.png",
    },
    {
      name: "Los Piojos",
      user: "Piojos4Ever",
      image:
        "https://pbs.twimg.com/profile_images/519964199296847872/jySIY1bd_400x400.jpeg",
    },
    {
      name: "Ciro y los Persas",
      user: "LosPiojosV2",
      image: "https://www.cmtv.com.ar/tapas-cd/ciroylospersas27.jpg",
    },
  ];

  var assistedConcerts = [
    {
      name: "Hannah Montana DisneyTours",
      place: "Estadio Unico de La Plata",
      date: "20/05/2010",
    },
    {
      name: "Kiss: the Comeback",
      place: "Quilmes Rock",
      date: "02/05/2022",
    },
    {
      name: "The Beatles",
      place: "Abbey Road",
      date: "09/12/1970",
    },
  ];



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

  return props.visitant ? (
    <div>
      <div className={styles.container}>
        <div className={styles.profile}>
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
                <div className={styles.description}>
                  {profile.description
                    ? profile.description
                    : "Hey there! I'm using Bragi"}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <br></br>
        {profile.nameTypeUser === "Artist" ? (
          <>
            <div className={styles.artist}>
              {/*               <div className={styles.events}>
                <h1>EVENTS</h1>
                {events.map((e) => (
                  <div className={styles.event}>
                    <p>
                      DATE:<span>{e.date}</span>
                    </p>
                    <p>
                      COUNTRY: <span>{e.country}</span>
                    </p>
                    <p>
                      PLACE:<span>{e.place}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.concerts}>
                <h1>CONCERTS</h1>
                {concerts.map((e) => (
                  <div className={styles.concert}>
                    <p>
                      DATE:<span>{e.date}</span>
                    </p>
                    <p>
                      TYPE:<span>{e.type}</span>
                    </p>
                    <p>
                      COUNTRY: <span>{e.country}</span>
                    </p>
                    <p>
                      PLACE:<span>{e.place}</span>
                    </p>
                  </div>
                ))}
              </div> */}
            </div>
            <div className={styles.posts}>
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
                        key={e.idPost}
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
                                    dislike({ token: token, idPost: e.idPost })
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
                                  dispatch(
                                    like({ token: token, idPost: e.idPost })
                                  );
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
            </div>
          </>
        ) : (
          <div className={styles.fan}>
            <h1>FOLLOWING</h1>
            <div className={styles.followed}>
              {followed.map((e) => (
                <div className={styles.followedArtist}>
                  <div
                    style={{
                      width: "4.5em",
                      height: "4.5em",
                      borderRadius: "100%",
                      backgroundImage: `url(${e.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <section>
                    <p>{e.name}</p>
                    <p>{e.user}</p>
                  </section>
                </div>
              ))}
            </div>
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
    <div>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img className={styles.profileImg} src={profileImage} alt=""></img>
            <div>
              <div>Followeds <div>{listFolloweds.map(e => {
                return (<div>{e.userNameFollowed}</div>)
              })}</div></div>

              <div><div>Followers {listFollowerss.map(e => {
                return (<div>{e.userNameFollower}</div>)
              })}
              </div></div>
            </div>
          
          
          
          {user.name ? (
            <div>
              <div>
                <div className={styles.name}>
                  {user.name + " " + user.lastName}
                </div>
                <div className={styles.name}>@{user.userName}</div>
                <h3>{user.typeUser === "Standard" ? "Fan" : user.typeUser}</h3>
                <div className={styles.description}>
                  {user.description
                    ? user.description
                    : "Hey there! I'm using Bragi"}
                </div>
              </div>
              <div>
                {showEditProfile ? (
                  <EditProfile
                    showModal={showEditProfile}
                    handleShowModal={handleShowEditProfile}
                  />
                ) : (
                  <div className={styles.editButton}>
                    <Button
                      className="secondary"
                      onClick={handleShowEditProfile}
                    >
                      Wanna Edit Your Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <br></br>
        {user.typeUser === "Artist" ? (
          <>
            <div className={styles.artist}>
              <div className={styles.events}>
                <h1>EVENTS</h1>
                {events.map((e) => (
                  <div className={styles.event}>
                    <p>
                      DATE:<span>{e.date}</span>
                    </p>
                    <p>
                      COUNTRY: <span>{e.country}</span>
                    </p>
                    <p>
                      PLACE:<span>{e.place}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.concerts}>
                <h1>CONCERTS</h1>
                {concerts.map((e) => (
                  <div className={styles.concert}>
                    <p>
                      DATE:<span>{e.date}</span>
                    </p>
                    <p>
                      TYPE:<span>{e.type}</span>
                    </p>
                    <p>
                      COUNTRY: <span>{e.country}</span>
                    </p>
                    <p>
                      PLACE:<span>{e.place}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.posts}>
              <h1>POSTS</h1>
              {postsTruchos.map((e) => (
                <div className={styles.post}>
                  <p>{e.content}</p>
                  <a href={e.link}>{e.link}</a>
                  <img
                    src={e.image}
                    style={{ width: "50px", height: "50px" }}
                    alt="postImg"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.fan}>
            <h1>FOLLOWING</h1>
            <div className={styles.followed}>
              {followed.map((e) => (
                <div className={styles.followedArtist}>
                  <div
                    style={{
                      width: "4.5em",
                      height: "4.5em",
                      borderRadius: "100%",
                      backgroundImage: `url(${e.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <section>
                    <p>{e.name}</p>
                    <p>{e.user}</p>
                  </section>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
