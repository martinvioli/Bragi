import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlbumByID, clearDetails } from "../../redux/actionCreators";
import styles from "./DetailsAlbum.css"
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
        <div className="containerDetailAlbum" style={{ color: "white" }}>
          <img className="imageDetailAlbum" src={album.cover_xl} alt="" />
          <div className="allTextDetailContainer">
            <a href={album.link} className="titleDetailAlbum">{album.title}</a>
            <a className="textDetailAlbum">Duration : {Math.round(album.duration / 60)} minutes</a>
            <a className="textDetailAlbum">Number of songs : {album.nb_tracks}</a>
            <a className="textDetailAlbum">Release Date : {album.release_date}</a>
          </div>
          <div className="trackListDetailAlbumContainer"> Looking for more info?
          <a className="trackListDetailAlbum" href={album.link} alt="">Check out the track List</a>
            <div className="logosDetailAlbumContainer">
              <img className="imageBragiAlbumDetails" src="https://i.imgur.com/4UBgUvv.png" alt="logo" />
              <img className="imageDeezerAlbumDetails" src="https://play-lh.googleusercontent.com/r55K1eQcji3QMHRKERq6zE1-csoh_MTOHiKyHTuTOblhFi_rIz06_8GN5-DHUGJOpn79" alt="logo" />
            </div>
          <a className="premiumAdtDetailAlbum" alt="">Don´t miss any update from your favorite artist!</a>
          <button className="premiumAdLinktDetailAlbum" alt="">Go premium now!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsAlbum;
