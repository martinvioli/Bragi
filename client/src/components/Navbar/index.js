import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  NavbarText,
  Button,
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Navbar.module.css";
import { IoShareSocialSharp } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";
import { FaUserFriends, FaUserAlt } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import axios from "axios";
import api from "../../Utils";

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  // button logout function
  async function handleClick(e) {
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
    }).then(async (result) => {
      if (result.isDenied) {
        const response = await axios.post(api.deleteToken, {
          token: JSON.parse(window.localStorage.getItem("userCredentials")),
        });
        console.log(response.data);
        window.localStorage.removeItem("userCredentials");
        navigate("/");
      }
    });
  }

  return (
    <>
      <nav className={styles.nav}>
        <FaUserFriends
          style={{ width: "3em", height: "3em", color: "white" }}
          className={styles.logoTwo}
        />
        <LinkContainer to="/feed">
          <img
            className={styles.logo}
            src="https://i.imgur.com/Ipn3eCY.png"
            alt=""
          ></img>
        </LinkContainer>
        <LinkContainer
          to="/profile"
          style={{ width: "2em", height: "2em", color: "white" }}
          className={styles.logoTwo}
        >
          <FaUserAlt />
        </LinkContainer>
        <HiLogout
          onClick={(e) => handleClick(e)}
          style={{ width: "1.5em", height: "1.5em", color: "white" }}
          className={styles.logoTwo}
        />
      </nav>
      <Outlet />
    </>
  );
}
