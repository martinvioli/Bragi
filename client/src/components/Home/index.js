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
  getUser,
  getToken,
  clearData,
} from "../../redux/actionCreators";
import SearchData from "../SearchData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const song = useSelector((state) => state.song);
  const artist = useSelector((state) => state.artist);
  const album = useSelector((state) => state.album);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    if (userCredentials) {
      setShow(true);
      const userToken = JSON.parse(userCredentials);
      userToken && dispatch(getUser(userToken));
      userToken && dispatch(getToken(userToken));
    }
    if (!userCredentials) {
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
      case "genre":
        dispatch(clearData());
        alert("No hay busqueda por genero.");
        break;
      default:
        dispatch(clearData());
        alert("El parametro ingresado no es valido.");
    }
    setInput({
      search: "",
      searchOption: "",
    });
  };

  // button logout function
  function handleClick(e) {
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
        <div>
          <Navbar color="light" expand="md" fixed="top" light>
            <NavbarText href="/home">
              <img
                id="logo"
                src="https://www.svgrepo.com/show/194008/music.svg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              ></img>
            </NavbarText>
            <NavbarToggler onClick={handleToggle} />
            <Collapse navbar isOpen={toggle}>
              <Nav className="me-auto" navbar>
                <NavItem className={styles.navFont}>
                  <LinkContainer to="/home">
                    <NavLink>
                      <GrHomeRounded
                        style={{ height: "30px", width: "30px" }}
                      />
                    </NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem className={styles.navFont}>
                  <NavLink disabled>
                    <FaUserFriends style={{ height: "30px", width: "30px" }} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <LinkContainer to="/profile">
                    <NavLink>
                      <img
                        src={user.profileImage}
                        alt="USER"
                        width="30px"
                        height="30px"
                        style={{ borderRadius: "100%", padding: "2px" }}
                      />
                    </NavLink>
                  </LinkContainer>
                </NavItem>
                <Button
                  color="danger"
                  outline
                  size="sm"
                  onClick={(e) => handleClick(e)}
                >
                  <MdLogout style={{ height: "20px", width: "20px" }} />
                </Button>
              </Nav>
            </Collapse>
          </Navbar>
          <div className="container" style={{ margin: "100px" }}>
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
                <option value="genre">Search for Genre</option>
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
          <div style={{ color: "white" }}>
            {song &&
              song.map((e) => {
                return (
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <SearchData data={e} key={e.id} />
                  </div>
                );
              })}
            {album &&
              album.map((e) => {
                return (
                  <div style={{ display: "inline-block" }}>
                    <SearchData data={e} />
                  </div>
                );
              })}
            {artist &&
              artist.map((e) => {
                return (
                  <div style={{ display: "inline-block" }}>
                    <SearchData data={e} />
                  </div>
                );
              })}
          </div>
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
