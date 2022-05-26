import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  NavbarText,
  Input,
  Form,
  Button,
  ButtonGroup,
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Home.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import {
  getAlbumByName,
  getArtistByName,
  getSongByName,
  getUserByName,
  getUser,
  getToken,
  clearData,
  getPhotoUser,
  getTop10Songs,
  listFollowed,
} from "../../redux/actionCreators";
import SearchData from "../SearchData";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";
import Top10 from "../Top10";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const song = useSelector((state) => state.song);
  const artist = useSelector((state) => state.artist);
  const album = useSelector((state) => state.album);
  const userSearch = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    if (userCredentials) {
      setShow(true);
      const userToken = JSON.parse(userCredentials);
      dispatch(getUser(userToken));
      dispatch(getToken(userToken));
      dispatch(getPhotoUser(user.userName));
    }
    if (!userCredentials) {
      navigate("/");
    }
  }, []);

  const [input, setInput] = useState({
    search: "",
    searchOption: "",
  });

  // const handleClickSearchOption = (e) => {
  //   setInput(([e.target.name] = e.target.value));
  //   console.log(input);
  // };

  const handleInput = (e) => {
    /// console.log(input);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    //console.log(input);
  };

  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  const handleSubmitInput = (e) => {
    e.preventDefault();
    if (!input.search) {
      dispatch(clearData());
      Swal.fire({
        title: "We were unable to perform your search 😪",
        confirmButtonColor: "#dd9202",
      });
      dispatch(getTop10Songs());
    }
    switch (input.searchOption) {
      case "album":
        dispatch(clearData());
        dispatch(getAlbumByName(input.search));
        break;
      case "artist":
        dispatch(clearData());
        dispatch(getArtistByName(input.search));
        break;
      case "song":
        dispatch(clearData());
        dispatch(getSongByName(input.search));
        break;
      case "user":
        dispatch(clearData());
        dispatch(getUserByName(input.search));
        break;
      default:
        dispatch(clearData());
        Swal.fire({
          title: "We were unable to perform your search 😪",
          confirmButtonColor: "#dd9202",
        });
        dispatch(getTop10Songs());
    }
    setInput({
      search: "",
      searchOption: "",
    });
  };

  // button logout function
  function handleClick(e) {
    // tenemos que agregar un llamado a este endpoint asi los del back borran el token y de la db tambien /closeSessionUser
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to logout?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isDenied) {
        window.localStorage.removeItem("userCredentials");
        navigate("/");
      }
    });
  }

  var followed = useSelector((state) => state.listFollowed);
  //console.log(followed);

  useEffect(() => {
    dispatch(listFollowed(user.userName));
  }, [user]);

  return (
    <div className={`${styles.allDivContainer}`}>
      {show ? (
        <div className={`${styles.divContainer}`}>
          <div className={`${styles.inputContainer}`}>
            <div
              className="container"
              style={{ marginTop: "100px", width: "50%" }}
            >
              <Form onSubmit={handleSubmitInput} className={styles.searchBar}>
                <Input
                  style={{
                    color: "#dd9202",
                    width: "50em",
                    height: "3em",
                    margin: "2em",
                    border: "2px solid rgba(66, 66, 66, 0.651)",
                    backgroundColor: "transparent",
                  }}
                  type="select"
                  name="searchOption"
                  value={input.searchOption}
                  defaultValue="default"
                  onChange={handleInput}
                >
                  <option value="default">Search ...</option>
                  <option value="album">Search for Albums</option>
                  <option value="song">Search for Songs</option>
                  <option value="artist">Search for Artists</option>
                  {/* <option value="genre">Search for Genre</option> */}
                  <option value="user">Search for Users</option>
                </Input>
                <Input
                  style={{
                    color: "#dd9202",
                    width: "80em",
                    height: "3em",
                    margin: "2em",
                    border: "2px solid rgba(66, 66, 66, 0.651)",
                    backgroundColor: "transparent",
                  }}
                  onChange={handleInput}
                  type="text"
                  value={input.search}
                  name="search"
                  placeholder="Search ..."
                />
                <Input
                  className={styles.buttonToSearchHome}
                  style={{
                    width: "7em",
                    height: "3em",
                    margin: "2em",
                    border: "2px solid rgba(66, 66, 66, 0.651)",
                    color: "#dd9202",
                    backgroundColor: "transparent",
                  }}
                  type="submit"
                  value="Search"
                />
              </Form>
            </div>
            <div
              className="searchData"
              style={{ color: "white", backgroundColor: "transparent" }}
            >
              {song &&
                song.map((e) => {
                  return (
                    <Link
                      className={styles.linkHomeSong}
                      to={`/song/${e.id}`}
                    >
                      <div
                        className={`${styles.searchData}`}
                        key={e.id}
                      >
                        <SearchData data={e} key={e.id} />
                      </div>
                    </Link>
                  );
                })}
                {console.log(song)}
              {album &&
                album.map((e) => {
                  return (
                    <Link
                      className={styles.linkHomeAlbum}
                      to={`/album/${e.id}`}
                    >
                      <div 
                      className={`${styles.searchData}`}
                      key={e.id}
                      >
                        <SearchData data={e} />
                      </div>
                    </Link>
                  );
                })}
              {artist &&
                artist.map((e) => {
                  if (e.id !== undefined) {
                    return (
                      <Link to={`/artist/${e.id}`}>
                        <div className={`${styles.searchData}`} key={e.id}>
                          <SearchData data={e} />
                        </div>
                      </Link>
                    );
                  } else {
                  }
                })}
              {userSearch[0] &&
                userSearch[0].map((e) => {
                  if (e.userName !== user.userName) {
                    return (
                      <div key={e.userName} style={{ display: "inline-block" }}>
                        <SearchData data={e} />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              {userSearch[0] && userSearch[0].length === 0 ? (
                <h3>We couldn't find any user with that name 😪. Try again!</h3>
              ) : null}
            </div>
          </div>
          {/* <div className={`${styles.top10}`}> */}
          <Top10 />
          {/* </div> */}
        </div>
      ) : (
        <h1 style={{ color: "white", textAlign: "center" }}>
          YOU HAVE TO BE LOG IN
        </h1>
      )}
    </div>
  );
}

export default Home;
