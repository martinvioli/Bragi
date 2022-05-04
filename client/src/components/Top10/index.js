import React, { useEffect } from "react";
import {
  getTop10Songs,
  getTop10artist,
  getTop10albums,
} from "../../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";

function Top10() {
  const songs = useSelector((state) => state.topSongs);
  const artists = useSelector((state) => state.topArtists);
  const albums = useSelector((state) => state.topAlbums);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTop10Songs());
    dispatch(getTop10artist());
    dispatch(getTop10albums());
  }, []);

  return (
    <>
      <div className="container" style={{ color: "white" }}>
        <div className="row aling-items-start">
          <div className="col">
            {songs &&
              songs.map((e) => {
                return (
                  <div key={e.id}>
                    <h3>{e.title}</h3>
                    <h4>Artista : {e.artist.name}</h4>
                    <h4>Album : {e.album.title}</h4>
                    <a href={e.link}>TRACK</a>
                    <audio src={e.preview} controls></audio>
                    <img
                      src={e.artist.picture_small}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    />
                  </div>
                );
              })}
          </div>
          <div class="col">
            {artists &&
              artists.map((e) => {
                return (
                  <div key={e.id}>
                    <h1>{e.position}</h1>
                    <h3>{e.name}</h3>
                    <a href={e.link}>TRACK</a>
                    <img
                      src={e.picture}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    />
                  </div>
                );
              })}
          </div>
          <div className="col">
            {albums &&
              albums.map((e) => {
                return (
                  <div key={e.id}>
                    <h3>{e.title}</h3>
                    <h4>Artista : {e.artist.name}</h4>
                    <h4>Album : {e.title}</h4>
                    <a href={e.link}>TRACK</a>
                    <img
                      src={e.cover}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    />
                  </div>
                );
              })}
          </div>
          {/* <h1>Holaaa</h1> */}
        </div>
      </div>
    </>
  );
}

export default Top10;
