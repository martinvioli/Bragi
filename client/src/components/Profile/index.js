import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getPhotoUser, getUser } from "../../redux/actionCreators";
import EditProfile from "../EditProfile";
import styles from "./Profile.module.css";

function Profile() {
  var user = useSelector((state) => state.user);
  const profileImage = useSelector((state) => state.profileImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditProfile, setShowEditProfile] = useState(false);
  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    dispatch(getUser(userToken));
    dispatch(getPhotoUser(user.userName));
    if (!user.name) {
      navigate("/");
    }
    if (userToken) {
    }
  }, []);

  user = {
    ...user,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

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

  const handleShowEditProfile = (e) => setShowEditProfile(!showEditProfile);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img className={styles.profileImg} src={profileImage} alt=""></img>
          <div>
            {user.name ? (
              <>
                <div>
                  <h1
                    style={{ color: "white" }}
                  >{`${user.name.toUpperCase()} ${user.lastName.toUpperCase()}`}</h1>
                  <h3>{user.typeUser === "Standard" ? "Fan" : "Artist"}</h3>
                  <p>{user.description}</p>
                </div>
                <div>
                  {showEditProfile ? (
                    <EditProfile showModal={showEditProfile} />
                  ) : (
                    <Button
                      className="secondary"
                      onClick={handleShowEditProfile}
                    >
                      Wanna Edit Your Profile
                    </Button>
                  )}
                </div>
              </>
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
              <h1>FOLLOWING</h1>
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
