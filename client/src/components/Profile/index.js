import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const userCredentials = window.localStorage.getItem("userCredentials");
    const userToken = JSON.parse(userCredentials);
    if (userToken) {
      setShow(true);
    }
  }, []);

  return (
    <div>
      <h1
        style={{ color: "white", textAlign: "center" }}
      >{`${user.name.toUpperCase()} ${user.lastName.toUpperCase()}`}</h1>
    </div>
  );
}

export default Profile;
