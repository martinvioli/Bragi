import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";
import { Button } from "reactstrap";
import {
  followUser,
  getToken,
  getUser,
  unfollowUser,
} from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchData.module.css";
import { Link } from "react-router-dom";
import api from "../../Utils";
function SearchData({ data }) {
  const dispatch = useDispatch();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(
      (token) =>
        (token = JSON.parse(window.localStorage.getItem("userCredentials")))
    );
  }, []);

  var followed = useSelector((state) => state.listFollowed);

  return (
    <div className={styles.containerSearch}>
      <div
        className={styles.containerEachSearch}
      >
        {console.log(data)}
        {data.picture_xl && <img className={styles.imgArtist} src={data.picture_xl} alt="img" />}
        {data.album && <img className={styles.imgSongSearchData} src={data.album.cover_xl} alt="Imagen" />}
        {data.cover && <img className={styles.imgSongSearchData} src={data.cover_xl} alt="Imagen" />}
        <div className={styles.songTextContainer}>
        {data.title && <h6 className={styles.songtitleSearchData} color="white"> {data.title}</h6>}
        {data.type === "track" && <h6 className={styles.songArtistSearchData} color="white"> {data.artist.name}</h6>}
        {data.type === "album" && <h6 className={styles.songArtistSearchData} color="white"> {data.artist.name}</h6>}
        </div>
        {data.name && !data.userName && <h1 className={styles.nameDetailsArtist}>{data.name}</h1>}
        {data.userName && (
          <div
            id={data.userName}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <img
              src={`${api.getPhotoUser}${data.userName}`}
              alt=""
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
              }}
            ></img>
            <Link to={`/profile/${data.userName}`} className={styles.username}>
              <h4>@{data.userName}</h4>
            </Link>
            {followed.some((e) => e.userNameFollowed === data.userName) ? (
              <Button
                className={styles.unFollowBtn}
                onClick={() => {
                  dispatch(
                    unfollowUser({ token, unfollowedUsername: data.userName })
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
                    followUser({ token, followedUsername: data.userName })
                  )
                }
              >
                Follow
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchData;
