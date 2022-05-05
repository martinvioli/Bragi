import React, { useEffect } from "react";
import {
  getTop10Songs,
  getTop10artist,
  getTop10albums,
} from "../../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "reactstrap";
import styles from "./Top10.module.css";
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
      <div
        className={`container ${styles.divContainer}`}
        style={{ color: "white" }}
      >
        <div className="row aling-items-start">
          <div className={`col ${styles.column}`}>
            <h5>Top 10 Songs</h5>
            <hr />
            {songs &&
              songs.map((e, i) => {
                return (
                  <div key={e.id}>
                    <p>{i + 1}</p>
                    <p>Song : {e.title}</p>
                    <p>Artista : {e.artist.name}</p>
                    {/* <p>Album : {e.album.title}</p> */}
                    <a href={e.link}>Link to the track</a>
                    <label>Demo: </label>
                    <audio
                      src={e.preview}
                      className={styles.audio}
                      controls
                    ></audio>
                    {/* <img
                      src={e.artist.picture_small}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    /> */}
                    <hr />
                  </div>
                );
              })}
          </div>
          <div class={`col ${styles.column}`}>
            <h5>Top 10 Artists</h5>
            <hr />
            {artists &&
              artists.map((e) => {
                return (
                  <div key={e.id}>
                    <p>{e.position}</p>
                    <p>{e.name}</p>
                    {/* <a href={e.link}>Link to the track</a> */}
                    <img
                      src={e.picture}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    />
                    <hr />
                  </div>
                );
              })}
          </div>
          <div className={`col ${styles.column}`}>
            <h5>Top 10 Albums</h5>
            <hr />
            {albums &&
              albums.map((e, i) => {
                return (
                  <div key={e.id}>
                    <p>{i + 1}</p>
                    <p>Album : {e.title}</p>
                    <p>Artista : {e.artist.name}</p>
                    <a href={e.link}>Link to the track</a>
                    <img
                      src={e.cover_small}
                      class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      alt="TOP"
                    />
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Top10;
