import React, { useEffect } from "react";
import {
  getTop10Songs,
  getTop10artist,
  getTop10albums,
  clearData,
} from "../../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, ButtonGroup } from "reactstrap";
import styles from "./Top10.module.css";
function Top10() {
  const songs = useSelector((state) => state.topSongs);
  const artists = useSelector((state) => state.topArtists);
  const albums = useSelector((state) => state.topAlbums);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearData());
    dispatch(getTop10Songs());
    // dispatch(getTop10artist());
    // dispatch(getTop10albums());
  }, []);
  const handle10Songs = () => {
    //e.preventDefault()
    dispatch(clearData());
    dispatch(getTop10Songs());
  };
  const handle10Albums = () => {
    //e.preventDefault()
    dispatch(clearData());
    dispatch(getTop10albums());
  };
  const handle10Artists = () => {
    //e.preventDefault()
    dispatch(clearData());
    dispatch(getTop10artist());
  };
  return (
    <>
      <div className={`${styles.divContainer}`} style={{ color: "white" }}>
        <div>
          <div>
            <ButtonGroup>
              <Button
                className={styles.top10button}
                color="dark"
                onClick={() => handle10Songs()}
              >
                Top 10 songs
              </Button>
              <Button
                className={styles.top10button}
                color="dark"
                onClick={() => handle10Artists()}
              >
                Top 10 artists
              </Button>
              <Button
                className={styles.top10button}
                color="dark"
                onClick={() => handle10Albums()}
              >
                Top 10 albums
              </Button>
            </ButtonGroup>
          </div>
          <div class={`col ${styles.columnArtists}`}>
            <hr />
            {artists &&
              artists.map((e) => {
                return (
                  <div key={e.id}>
                    <br />
                    <div class={styles.container}>
                      <img
                        src={e.picture_xl}
                        alt="Avatar"
                        class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      />
                      <div class={styles.overlay}>
                        <div class={styles.text}>
                          <p>{e.position}</p>
                          <a style={{ color: "white" }} href={e.link}>
                            {e.name}
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*
                      <p>{e.position}</p>
                      <p>{e.name}</p>
                      <img
                        src={e.picture_medium}
                        class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                        alt="TOP"
                      />
                      <hr /> 
                      */}
                    <br />
                  </div>
                );
              })}
          </div>

          <div class={`col ${styles.columnSongs}`}>
            <hr />
            {songs &&
              songs.map((e, i) => {
                return (
                  <div key={e.id}>
                    <div class={styles.container}>
                      <img
                        src={e.album.cover_xl}
                        alt="Song Album"
                        class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      />
                      <div class={styles.overlay}>
                        <div class={styles.text}>
                          <p>{e.position}</p>
                          <p>{e.artist.name}</p>
                          <a href={e.link}>{e.title}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  // <div key={e.id}>
                  //   <p>{i + 1}</p>
                  //   <p>Song : {e.title}</p>
                  //   <p>Artista : {e.artist.name}</p>
                  //   <p>Album : {e.album.title}</p>
                  //   <a href={e.link}>Link to the track</a>
                  //   <br></br>
                  //   <label>Demo: </label>
                  //   <br></br>
                  //   <audio
                  //     src={e.preview}
                  //     className={styles.audio}
                  //     controls
                  //   ></audio>
                  //   <img
                  //     src={e.artist.picture_small}
                  //     class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                  //     alt="TOP"
                  //   />
                  // <hr />
                  // </div>
                );
              })}
          </div>
          <br></br>
          <div className={`col ${styles.columnAlbums}`}>
            <hr />
            {albums &&
              albums.map((e, i) => {
                return (
                  <div key={e.id}>
                    <div class={styles.container}>
                      <img
                        src={e.cover_xl}
                        alt="Album"
                        class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                      />
                      <div class={styles.overlay}>
                        <div class={styles.text}>
                          <p>{e.position}</p>
                          <a href={e.link}>{e.title}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  // <div key={e.id}>
                  //   <p>{i + 1}</p>
                  //   <p>Album : {e.title}</p>
                  //   <p>Artista : {e.artist.name}</p>
                  //   <a href={e.link}>Link to the track</a>
                  //   <img
                  //     src={e.cover_small}
                  //     class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
                  //     alt="TOP"
                  //   />
                  //   <hr />
                  // </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );

  // <>
  //   <div className={`${styles.divContainer}`} style={{ color: "white" }}>
  //     <div className="row aling-items-start">
  //       <div className={`col ${styles.column}`}>
  //         <h5>Top 10 Songs</h5>
  //         <hr />
  //         {songs &&
  //           songs.map((e, i) => {
  //             return (
  //               <div key={e.id}>
  //                 <p>{i + 1}</p>
  //                 <p>Song : {e.title}</p>
  //                 <p>Artista : {e.artist.name}</p>
  //                 {/* <p>Album : {e.album.title}</p> */}
  //                 <a href={e.link}>Link to the track</a>
  //                 <label>Demo: </label>
  //                 <audio
  //                   src={e.preview}
  //                   className={styles.audio}
  //                   controls
  //                 ></audio>
  //                 {/* <img
  //                   src={e.artist.picture_small}
  //                   class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
  //                   alt="TOP"
  //                 /> */}
  //                 <hr />
  //               </div>
  //             );
  //           })}
  //       </div>
  //       <div class={`col ${styles.column}`}>
  //         <h5>Top 10 Artists</h5>
  //         <hr />
  //         {artists &&
  //           artists.map((e) => {
  //             return (
  //               <div key={e.id}>
  //                 <p>{e.position}</p>
  //                 <p>{e.name}</p>
  //                 {/* <a href={e.link}>Link to the track</a> */}
  //                 <img
  //                   src={e.picture_small}
  //                   class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
  //                   alt="TOP"
  //                 />
  //                 <hr />
  //               </div>
  //             );
  //           })}
  //       </div>
  //       <div className={`col ${styles.column}`}>
  //         <h5>Top 10 Albums</h5>
  //         <hr />
  //         {albums &&
  //           albums.map((e, i) => {
  //             return (
  //               <div key={e.id}>
  //                 <p>{i + 1}</p>
  //                 <p>Album : {e.title}</p>
  //                 <p>Artista : {e.artist.name}</p>
  //                 <a href={e.link}>Link to the track</a>
  //                 <img
  //                   src={e.cover_small}
  //                   class="img-fluid|thumbnail rounded-top|rounded-end|rounded-bottom|rounded-start|rounded-circle|"
  //                   alt="TOP"
  //                 />
  //                 <hr />
  //               </div>
  //             );
  //           })}
  //       </div>
  //     </div>
  //   </div>
  // </>
}

export default Top10;
