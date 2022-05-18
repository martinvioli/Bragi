import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongByID, clearDetails } from "../../redux/actionCreators";
import styles from "./DetailsSong.css"

const DetailsSong = () => {
  const id = useParams().id;
  const song = useSelector((state) => state.songById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongByID(id));
    return dispatch(clearDetails());
  }, []);
  return (
    <>
      {song ? (
        <div className="containerDetailsSong">
          <div className="audioAndImgDetailsSong">
            <img className="imageDeezerDetailsSong" src="https://monday.com/static/uploads/CassandraFederbusz/3149e1a1-a01c-43d9-b3fd-9a1145929846_PngItem_28185882.png" alt="logo" />
            <a href={song.link} className="textDetailsSong">Check out the full version in Deezer</a> 
            <audio className="audioDetailsSong" src={song.preview} controls></audio>
          </div>
          <div className="textDetailsSongContainer">
            <a className="titleDetailsSong">{song.title}</a>
            <a className="durationDetailsSong">Length : {song.duration} seconds</a>
            <a className="rankingDetailsSong">Ranking : {song.rank}</a>
            <a className="releaseDetailsSong">Release Date : {song.release_date}</a>
            <div className="songDetailAdsContainer"> Looking for more info?
          <a className="trackListDetailAlbum" href={song.link} alt="">Check out the full track</a>
            <div className="logosDetailAlbumContainer">
              <img className="imageBragiAlbumDetails" src="https://i.imgur.com/4UBgUvv.png" alt="logo" />
              <img className="imageDeezerAlbumDetails" src="https://play-lh.googleusercontent.com/r55K1eQcji3QMHRKERq6zE1-csoh_MTOHiKyHTuTOblhFi_rIz06_8GN5-DHUGJOpn79" alt="logo" />
            </div>
          <a className="premiumAdtDetailAlbum" alt="">Don´t miss any update from your favorite artist!</a>
          <button className="premiumAdLinktDetailAlbum" alt="">Go premium now!</button>
          </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailsSong;
