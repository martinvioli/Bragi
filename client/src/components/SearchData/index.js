import React from "react";
import { FcPlus } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";
import { Button } from "reactstrap";
import { followUser, getToken, getUser } from "../../redux/actionCreators";
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
    console.log(userToken);
    console.log(data.token);
  }, []);
  console.log(data);
  const handleClickFollow = (data) => {
    //e.preventDefault()
    const userToken = JSON.parse(
      window.localStorage.getItem("userCredentials")
    );
    console.log(userToken);
    console.log(data.token);
    dispatch(followUser(userToken, data.token));
  };

  return (
    <>
      {data.error && <h3>We didnt find any coincidence.</h3>}
      <div
        className="containerSearch"
        style={{ height: "200px", width: "200px" }}
      >
        {data.title && <h6 color="white"> {data.title}</h6>}
        {data.album && <img src={data.album.cover} alt="Imagen" />}
        {data.cover && <img src={data.cover} alt="Imagen" />}
        {data.name && !data.userName && <h1>{data.name}</h1>}
        {data.picture && <img src={data.picture} alt="img" />}
        {data.userName && (
          <h1 style={{ marginTop: "2em" }} className="username">
            @{data.userName}
          </h1>
        )}
        {data.userName && (
          <div>
            <Button onClick={() => handleClickFollow(data)}>
              <FcPlus style={{ width: "3em", height: "3em" }}></FcPlus>
            </Button>{" "}
            <Button>
              <FaMinusCircle
                style={{ width: "3em", height: "3em" }}
              ></FaMinusCircle>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchData;
