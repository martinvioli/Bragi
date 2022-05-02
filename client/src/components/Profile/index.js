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
              </div>
            ) : null}
          </div>
        </div>
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
        <div className={styles.posts}></div>
      </div>
    </div>
  );
}

export default Profile;
