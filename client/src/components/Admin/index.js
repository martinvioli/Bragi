import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Form, Button } from "reactstrap";
import { getUserByName } from "../../redux/actionCreators";
function Admin() {
  const user = useSelector((state) => state.user);
  const userSearch = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleSubmitInput = (e) => {
    e.preventDefault();
    dispatch(getUserByName(input));
    setInput("");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleBan = () => {
    alert("Baneado");
  };

  return (
    <>
      <div className="container">
        <h1 style={{ marginTop: "100px", color: "white" }}>ADMIN</h1>
        <div className="container" style={{ marginTop: "100px" }}>
          <Form onSubmit={handleSubmitInput}>
            <Input
              //color="bg-danger"
              onChange={handleInput}
              type="text"
              value={input}
              name="search"
              placeholder="Search ..."
            />
            <Input type="submit" value="Search" />
          </Form>
        </div>
        {userSearch[0] &&
          userSearch[0].map((e) => {
            return (
              <div
                key={e.idUser}
                style={{
                  display: "inline-block",
                  border: "1px solid orange",
                  borderRadius: "20px",
                  margin: "5px",
                }}
              >
                <h4 style={{ color: "white", marginTop: "2em" }}>
                  @{e.userName}
                </h4>
                <Button onClick={handleBan}>Ban User</Button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Admin;
