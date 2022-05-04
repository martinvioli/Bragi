import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../redux/actionCreators";
import styles from "./Feed.module.css";
import { getAllPost } from "../../redux/actionCreators";

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

const posts = [
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
  const [input, setInput] = useState({
    content: "",
    token: "",
    link: "",
    image: "",
  });

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //dispatch(getAllPost());

  useEffect(() => {
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    dispatch(getToken(userToken));
    dispatch(getUser(userToken));
    if (!userToken) {
      navigate("/");
    }
  }, []);

  const handleSearchImage = (e) => {
    setInput({
      image: e.target.files[0],
    });
    console.log(e.target);
    console.log(e.target.files[0]);
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleClick(e) {
    e.preventDefault();
    setInput({ ...input, token: token });
    posts.unshift(input);
    setInput({
      content: "",
      token: "",
      link: "",
      image: "",
    });
    // dispatch(userNewPost(input))
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
          {user.typeUser === "Artist" ? (
            <div className={styles.newPost}>
              <form>
                <h3>Add new post</h3>
                <div className={styles.divTextarea}>
                  <Input
                    color="bg-light"
                    placeholder="tell us about something that has happened to you with music..."
                    className={styles.textarea}
                    name="content"
                    value={input.content}
                    type="textarea"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.buttons}>
                  <Input
                    accept="image/png,image/jpeg"
                    type="file"
                    name="image"
                    onChange={handleSearchImage}
                  />
                  <Input
                    onChange={handleChange}
                    type="url"
                    name="link"
                    placeholder="Insert URL 🔗"
                  />
                  <Button color="primary" onClick={(e) => handleClick(e)}>
                    Post
                  </Button>
                </div>
              </form>
              <br></br>
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
              </div>
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
                          width: "50%",
                          height: "40%",
                        }}
                        color="bg-light"
                        className={styles.backgroundPost}
                        key={e.token}
                      >
                        <CardBody>
                          <CardTitle tag="h5">{user.username}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {e.content}
                          </CardSubtitle>
                        </CardBody>
                        <div className={styles.img}>
                          <img
                            className={styles.img}
                            alt="img"
                            src={e.image}
                            height="90px"
                            width="90px"
                          />
                        </div>
                        <CardLink href={e.link}>Link</CardLink>
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
