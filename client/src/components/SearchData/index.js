import React from "react";
import styles from "./SearchData.css";
import { FcPlus } from "react-icons/fc";
import { Button } from "reactstrap";
function SearchData({ data }) {
  console.log(data.userName);
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
          <Button color="bg-transparent">
            <FcPlus style={{ width: "3em", height: "3em" }}></FcPlus>
          </Button>
        )}
      </div>
    </>
  );
}

export default SearchData;
