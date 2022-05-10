import React from "react";

function SearchData({ data }) {
  return (
    <>
      {data.error && <h3>We didnt find any coincidence.</h3>}
      <div className="container" style={{ height: "200px", width: "200px" }}>
        {data.title && <h6 color="white"> {data.title}</h6>}
        {data.album && <img src={data.album.cover} alt="Imagen" />}
        {data.cover && <img src={data.cover} alt="Imagen" />}
        {data.name && <h1>{data.name}</h1>}
        {data.picture && <img src={data.picture} alt="img" />}
        {data.userName && <h1 color="white">{data.userName}</h1>}
      </div>
    </>
  );
}

export default SearchData;
