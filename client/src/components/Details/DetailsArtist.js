import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetails, getArtistByID } from "../../redux/actionCreators";
import styles from "./DetailsArtist.css"

const DetailsArtist = () => {
  const id = useParams().id;
  const artist = useSelector((state) => state.artistById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistByID(id));
    return dispatch(clearDetails());
  }, []);

  return (
    <>
      {artist && (
        <div className="containerDetailsArtist">
          <img className="imageDetailsArtist" src={artist.picture_xl}></img>
          <div className="textContainerDetailsArtist">
            <a className="nameArtistDetailsArtist" href={artist.link}>{artist.name}</a>
            <a className="releasedDetailsArtist">Released albums : {artist.nb_album}</a>
            <a className="feedDetailsArist">Want to know more about {artist.name}?</a>
            <a className="feedBtnDetailsArtist">See what´s up in your feed</a>
          </div>
          <div className="trackListDetailArtistContainer"> Looking for more info?
          <a className="trackListDetailAlbum" href={artist.link} alt="">Check out the artist details</a>
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

export default DetailsArtist;
