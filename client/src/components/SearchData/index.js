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
import styles from "./SearchData.css";
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
    document.getElementById("followBtn").disabled = true;
    document.getElementById("unFollowBtn").disabled = false;
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
    document.getElementById("unFollowBtn").disabled = true;
    document.getElementById("followBtn").disabled = false;
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
        className="containerSearch"
        style={{ height: "200px", width: "200px" }}
      >
        {data.title && <h6 color="white"> {data.title}</h6>}
        {data.album && <img src={data.album.cover_xl} alt="Imagen" />}
        {data.cover && <img src={data.cover_xl} alt="Imagen" />}
        {data.name && !data.userName && <h1>{data.name}</h1>}
        {data.picture && <img src={data.picture} alt="img" />}
        {data.userName && (
          <h1 style={{ marginTop: "2em" }} className="username">
            @{data.userName}
          </h1>
        )}
        {data.userName && (
          <div>
            <Button
              id="followBtn"
              className="followBtn"
              onClick={() => handleClickFollow(data)}
            >
              Follow
            </Button>{" "}
            <Button
              id="unFollowBtn"
              className="unFollowBtn"
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
