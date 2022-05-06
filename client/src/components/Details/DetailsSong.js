import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongByID, clearDetails } from "../../redux/actionCreators";

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
        <div style={{ color: "white" }}>
          <h2>NOMBRE DE LA CANCION : {song.title}</h2>
          {/* <h3>ARTISTA QUE LA COMPUSO : {song.artist.name}</h3> */}
          {/* <h3>ALBUM A LA QUE PERTENEZE : {song.album.title}</h3> */}
          <p>
            {/* Paises en la que esta disponible {song.available_countries.lenght} */}
          </p>
          <p>Duracion : {song.duration / 60}</p>
          <label>Preview :</label>
          <audio src={song.preview} controls></audio>
          <p>RANKING : {song.ranking}</p>
          <p>FECHA DE LANZAMIENTO : {song.realease_date}</p>
        </div>
      ) : null}
    </>
  );
};

export default DetailsSong;
