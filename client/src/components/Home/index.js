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
      console.log(userSearch);
      setShow(true);
      const userToken = JSON.parse(userCredentials);
      dispatch(getUser(userToken));
      dispatch(getToken(userToken));
      dispatch(getPhotoUser(user.userName));
    }
    if (!userCredentials) {
      console.log(user);
      navigate("/");
    }

    console.log(user);
  }, []);

  // useEffect(() => {
  //   dispatch(getAlbumByName("shakira"));
  //   dispatch(getArtistByName("shakira"));
  //   dispatch(getSongByName("shakira"));
  // }, []);

  const [input, setInput] = useState({
    search: "",
    searchOption: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
      // case "genre":
      //   dispatch(clearData());
      //   alert("No hay busqueda por genero.");
      //   break;
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
      // alert("El parametro ingresado no es valido.");
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
  return (
    <div>
      {show ? (
        <div className={`${styles.divContainer}`}>
          <div className={`${styles.inputContainer}`}>
            <div className="container" style={{ marginTop: "100px", width: "50%" }}>
              <Form onSubmit={handleSubmitInput}>
                <Input
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
                  onChange={handleInput}
                  type="text"
                  value={input.search}
                  name="search"
                  placeholder="Search ..."
                />
                <Input type="submit" value="Search" />
              </Form>
            </div>
            <div className="searchData" style={{ color: "white", backgroundColor: "transparent" }}>
              {song &&
                song.map((e) => {
                  return (
                    <Link
                      to={`/song/${e.id}`}
                      style={{ display: "inline-block", color: "#f5f5f5" }}
                    >
                      <div
                        className={`${styles.searchData}`}
                        key={e.id}
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <SearchData data={e} key={e.id} />
                      </div>
                    </Link>
                  );
                })}
              {album &&
                album.map((e) => {
                  return (
                    <Link style={{ color: "white", backgroundColor: "transparent" }} to={`/album/${e.id}`}>
                      <div key={e.id} style={{ display: "inline-block" }}>
                        <SearchData data={e} />
                      </div>
                    </Link>
                  );
                })}
              {artist &&
                artist.map((e) => {
                  return (
                    <Link to={`/artist/${e.id}`}>
                      <div key={e.id} style={{ display: "inline-block" }}>
                        <SearchData data={e} />
                      </div>
                    </Link>
                  );
                })}
              {userSearch[0] &&
                userSearch[0].map((e) => {
                  return (
                    <div key={e.idUser} style={{ display: "inline-block" }}>
                      <SearchData data={e} />
                    </div>
                  );
                })}
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
