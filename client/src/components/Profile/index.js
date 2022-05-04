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

  var followed = [
    {
      name: "Taylor Swift",
      user: "taylorSwiftOK",
      image:
        "https://images.ecestaticos.com/dlsHpoc7C5yGsaGTQwhVNcF0-e0=/155x146:1981x1515/1200x899/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F04a%2F214%2F268%2F04a214268f07ee4870e767106a8b1527.jpg",
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
                <h5>{user.typeUser === "Standard" ? "Fan" : "Artist"}</h5>
                <p>{user.description}</p>
              </div>
            ) : null}
          </div>
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
              {posts.map((e) => (
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
            <div className={styles.followed}>
              {followed.map((e) => (
                <div className={styles.followedArtist}>
                  <img
                    src={e.image}
                    alt={e.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                    }}
                  />
                  <section>
                    <p>{e.name}</p>
                    <p>{e.user}</p>
                  </section>
                </div>
              ))}
            </div>
            <div className={styles.assistedConcerts}>
              {assistedConcerts.map((e) => (
                <div className={styles.assistedConcert}>
                  <p>{e.name}</p>
                  <p>{e.place}</p>
                  <p>{e.date}</p>
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
