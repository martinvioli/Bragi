import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlbumByID, clearDetails } from "../../redux/actionCreators";

const DetailsAlbum = () => {
  const id = useParams().id;
  const album = useSelector((state) => state.albumById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumByID(id));
    return dispatch(clearDetails());
  }, []);

  return (
    <>
      {album && (
        <div className="container" style={{ color: "white" }}>
          <h1>TITLE : {album.title}</h1>
          <a href={album.link}>LINK TO THE ALBUM</a>
          {/* <h3>Artist : {album.contributors[0].name}</h3> */}
          <img src={album.cover} alt="" />
          <h3>Duration : {Math.round(album.duration / 60)} minutes</h3>
          {/* <h3>Genre : {album.genres.data[0].name}</h3> */}
          <h3>Number of songs : {album.nb_tracks}</h3>
          <h3>Release Date : {album.release_date}</h3>
          <a href={album.tracklist} alt="">
            Track List
          </a>
          {/* {album &&
            album.tracks.data.map((e) => {
              return (
                <div key={e.id}>
                  <h5>{e.title}</h5>
                </div>
              );
            })} */}
        </div>
      )}
    </>
  );
};

export default DetailsAlbum;
