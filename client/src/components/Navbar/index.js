/* import React from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  NavbarText,
} from "reactstrap";

export default function Navbar() {
  return (
    <>
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
                  <GrHomeRounded style={{ height: "30px", width: "30px" }} />
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
    </>
  );
}
 */
