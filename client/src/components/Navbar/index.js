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
import { FaUserFriends, FaUserAlt, FaHome, FaSearch } from "react-icons/fa";
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
        window.localStorage.removeItem("userCredentials");
        navigate("/");
      }
    });
  }

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <LinkContainer to="/feed">
            <FaHome
              className={styles.logoHome}
              // src="https://i.imgur.com/7DI9tsb.png"
              // alt="HomeLogo"
            />
          </LinkContainer>
          <h2 className={styles.home}>Home</h2>
        </div>
        <img
          className={styles.logoBragi}
          src="https://i.imgur.com/4UBgUvv.png"
          alt="logo"
        />
        <div>
          <LinkContainer to="/home">
            <FaSearch className={styles.logoSearch} />
          </LinkContainer>
          <h2 className={styles.search}>Search</h2>
        </div>
        {/* <div>
          <FaUserFriends
          className={styles.logoFriends}
          />
          <h2 className={styles.social}>Social</h2>
        </div> */}
        <div>
          <LinkContainer to="/profile" className={styles.logoProfile}>
            <FaUserAlt />
          </LinkContainer>
          <h2 className={styles.profile}>Profile</h2>
        </div>
        <div>
          <HiLogout
            onClick={(e) => handleClick(e)}
            className={styles.logoOut}
          />
          <h2 className={styles.logout}>Log out</h2>
        </div>
      </nav>
      <Outlet className={styles.outlet} />
    </>
  );
}
