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

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

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
    <>
      <nav className={styles.nav}>
        <p className={styles.navText}>Social</p>
        <LinkContainer to="/feed">
          <img
            className={styles.logo}
            src="https://cdn0.iconfinder.com/data/icons/audio-icons/110/Harp-512.png"
            alt=""
          ></img>
        </LinkContainer>
        <LinkContainer to="/profile">
          <p className={styles.navText}>Profile</p>
        </LinkContainer>
        <p onClick={(e) => handleClick(e)}>🔙</p>
      </nav>
      <Outlet />
    </>
  );
}
