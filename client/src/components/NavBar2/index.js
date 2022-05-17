import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  NavBar,
  Collapse,
  NavBarToggler,
  NavItem,
  NavLink,
  Nav,
  NavBar22Text,
  Button,
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./NavBar2.module.css";
import { FaHome } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default function NavBar2() {
  return (
    <>
      <nav className={styles.nav}>
        <img
          className={styles.logoBragi}
          src="https://i.imgur.com/4UBgUvv.png"
          alt="logo"
        />
        <div>
          <LinkContainer to="/">
            <FaHome className={styles.logoHome} />
          </LinkContainer>
          <h2 className={styles.home}>Home</h2>
        </div>

        <div>
          <LinkContainer to="/bragi">
            <BsFillInfoSquareFill className={styles.logoSearch} />
          </LinkContainer>
          <h2 className={styles.search}>Learn More</h2>
        </div>
      </nav>
    </>
  );
}
