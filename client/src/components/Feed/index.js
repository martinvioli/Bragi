import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../redux/actionCreators";
import styles from "./Feed.module.css";

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

  useEffect(() => {
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    dispatch(getToken(userToken));
    if (!userToken) {
      navigate("/");
    }
  }, []);

  const handleSearchImage = (e) => {
    setInput({
      image: e.target.files[0],
    });
    console.log(e.target.files[0]);
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleClick(e) {
    e.preventDefault();
    setInput({ ...input, token: token });
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
    <div className={styles.container}>
      <div className={styles.premiumSector}>Sector Premium</div>
      <div className={styles.postSector}>
        Sector posts
        <div className={styles.newPost}>
          Nuevo post
          <form>
            <div className={styles.divTextarea}>
              <textarea
                placeholder="tell us about something that has happened to you with music..."
                className={styles.textarea}
                name="content"
                value={input.content}
                type="text"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className={styles.buttons}>
              <input
                accept="image/png,image/jpeg"
                type="file"
                name="image"
                onChange={handleSearchImage}
              />

              <button onClick={(e) => handleClick(e)}>Post</button>
            </div>
          </form>
        </div>
        <div className={styles.posts}>
          Lista de posts
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
          <div className={styles.post}>Cada post</div>
        </div>
      </div>
    </div>
  );
}
