import React from "react";
import { FcPlus } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";
import { Button } from "reactstrap";
import {
  followUser,
  getToken,
  getUser,
  unfollowUser,
} from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import styles from "./SearchData.module.css";
import { Link } from "react-router-dom";
function SearchData({ data }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    // dispatch(getToken(userToken));
    // dispatch(getUser(userToken));
    //console.log(userToken);
    //console.log(data.userName);
    let userNameOtherProfile = data.userName;
    //console.log(userNameOtherProfile);
  }, []);
  //console.log(data);
  const handleClickFollow = (data) => {
    //e.preventDefault()
    document.getElementById(`followBtn${data.userName}`).disabled = true;
    document.getElementById(`unFollowBtn${data.userName}`).disabled = false;
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    //console.log(userToken);
    //console.log(data.token);
    let obj = { token: userToken, tokenFollowed: data.token };
    //console.log(obj);
    dispatch(followUser(obj));
  };
  const handleClickUnfollow = (data) => {
    document.getElementById(`unFollowBtn${data.userName}`).disabled = true;
    document.getElementById(`followBtn${data.userName}`).disabled = false;
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    //console.log(userToken);
    //console.log(data.token);
    let obj = { token: userToken, tokenFollowed: data.token };
    //console.log(obj);
    dispatch(unfollowUser(obj));
  };

  return (
    <>
      {data.error && <h3>We didnt find any coincidence.</h3>}
      <div
        className={styles.containerSearch}
        style={{ height: "200px", width: "200px" }}
      >
        {data.title && <h6 color="white"> {data.title}</h6>}
        {data.album && <img src={data.album.cover_xl} alt="Imagen" />}
        {data.cover && <img src={data.cover_xl} alt="Imagen" />}
        {data.name && !data.userName && <h1>{data.name}</h1>}
        {data.picture && <img src={data.picture} alt="img" />}
        {data.userName && (
          <Link to={`/profile/${data.userName}`} className={styles.username}>
            <h1 style={{ marginTop: "2em" }} >
              @{data.userName}
            </h1>
          </Link>
        )}
        {data.userName && (
          <div>
            <Button
              id={`followBtn${data.userName}`}
              className={styles.followBtn}
              onClick={() => handleClickFollow(data)}
            >
              Follow
            </Button>{" "}
            <Button
              id={`unFollowBtn${data.userName}`}
              className={styles.unFollowBtn}
              onClick={() => handleClickUnfollow(data)}
            >
              Unfollow
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchData;
