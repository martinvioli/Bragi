import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, getUser, userNewPost } from "../../redux/actionCreators";
import styles from "./Feed.module.css";
import { getAllPost } from "../../redux/actionCreators";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcRedo } from "react-icons/fc";
import { FcLink } from "react-icons/fc";
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
} from "reactstrap";

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
    //setTimeout(dispatch(getAllPost()), 5000);

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
    setInput({
      token: token,
      contentPost: "",
      linkContent: "",
      imagePost: "",
    });
  }

  // ESTO PARA CUANDO SUBAMOS LA IMAGEN // axios.post("url", "archivo a postear", {
  // //   onUploadProgress: (progressEvent) => {
  // //     console.log(
  // //       `Upload Progress: ${Math.round(
  // //         (progressEvent.loaded / progressEvent.total) * 100
  // //       )}% `
  // //     );
  // //   },
  // });
  return (
    <div className="container-fluid">
      <div className={styles.container}>
        <div className={styles.premiumSector}>Sector Premium</div>
        <div className={styles.center}>
          {user.typeUser === "Artist" || user.userName === "primoro12" ? (
            <div className={styles.newPost}>
              <form>
                <h3>Add new post</h3>
                <div className={styles.divTextarea}>
                  <Input
                    color="bg-light"
                    placeholder="tell us about something that has happened to you with music..."
                    className={styles.textarea}
                    name="contentPost"
                    value={input.contentPost}
                    type="textarea"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.buttons}>
                  <Input
                    accept="image/png,image/jpeg"
                    type="file"
                    name="imagePost"
                    onChange={handleSearchImage}
                  />
                  <Input
                    onChange={handleChange}
                    type="url"
                    name="linkContent"
                    value={input.linkContent}
                    placeholder="Insert URL 🔗"
                  />
                  <Button
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
                            marginLeft: "5em",
                            width: "50%",
                            height: "40%",
                            minWidth: "25em",
                          }}
                          color="bg-light"
                          className={styles.backgroundPost}
                          key={e.idPost}
                        >
                          <CardBody>
                            <div className={styles.icons}>
                              <FcFullTrash
                                style={{
                                  marginBottom: "0.4em",
                                  marginLeft: "2.5em",
                                  width: "1.5em",
                                  height: "1.5em",
                                }}
                              />
                              <FcEditImage
                                style={{
                                  marginBottom: "0.4em",
                                  marginLeft: "2.5em",
                                  width: "1.5em",
                                  height: "1.5em",
                                }}
                              />
                            </div>
                            <CardTitle
                              style={{
                                color: "blue",
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                              tag="h6"
                            >
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
              See All Post
              <div className={styles.post}>
                {posts &&
                  posts.map((e) => {
                    return (
                      <Card
                        style={{
                          marginLeft: "10em",
                          width: "50%",
                          height: "40%",
                          minWidth: "25em",
                        }}
                        color="bg-light"
                        className={styles.backgroundPost}
                        key={e.token}
                      >
                        <CardBody>
                          <CardTitle
                            style={{
                              color: "blue",
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                            tag="h5"
                          >
                            {user.userName}
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
    </div>
  );
}
