import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    if (!user.name) {
      navigate("/");
    }
    console.log("render");
    if (userToken) {
    }
  }, []);

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

  console.log(user);

  return (
    <div style={{ marginTop: "5em" }}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img
            className={styles.profileImg}
            src={user.profileImage}
            alt=""
          ></img>
          <div>
            {user.name ? (
              <div>
                <h1
                  style={{ color: "white", textAlign: "center" }}
                >{`${user.name.toUpperCase()} ${user.lastName.toUpperCase()}`}</h1>
                <h1 style={{ color: "white", textAlign: "center" }}>
                  {user.userName.toUpperCase()}
                </h1>
                <h5>Fan/Artist</h5>
              </div>
            ) : null}
          </div>
        </div>
        <br></br>
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
        <br></br>
        <div className={styles.posts}>
          <h1>POSTS</h1>
          {posts.map((e) => (
            <div className={styles.post}>
              <p>{e.content}</p>
              <a href={e.link}>{e.link}</a>
              <img
                src={e.image}
                styles={{ width: "50px", height: "50px" }}
                alt="postImg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
