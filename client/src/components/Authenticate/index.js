// COMPONENTE EN DESUSO POR AHORA

//import React, { useState } from "react";
// import {
//   Card,
//   CardTitle,
//   CardText,
//   FormGroup,
//   Label,
//   Input,
//   Form,
// } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import styles from "./Authenticate.module.css";
// import axios from "axios";
// import api from "../../Utils";

// function Authenticate() {
//   const [token, setToken] = useState("");
//   const [code, setCode] = useState("");
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setCode(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const userCredentials = window.localStorage.getItem("userCredentials");
//       const userToken = JSON.parse(userCredentials);
//       if (userToken) {
//         setToken(userToken);
//       }
//       const response = await axios.post(`${api.authenticateUrl}`, token);

//       if (response.data.msg) {
//         alert("Tu cuenta fue registrada con exito");
//         navigate("/home");
//         return;
//       }
//       if (response.data.msgE) {
//         alert("El codigo de autentificacion no es el correcto");
//       }
//       setToken("");
//       setCode("");
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <div className={styles.background}>
//       <Card
//         style={{ margin: "10em", paddingTop: "2em", border: "7px solid black" }}
//         body
//         color="info"
//       >
//         <CardTitle tag="h5"></CardTitle>
//         <CardText>
//           <h1 className={styles.title}>AUTHENTICATE</h1>
//           <h2 className={styles.subtitle}>
//             Thanks you for your registration on BRAGI <br />
//             Please check your email and put your code here
//           </h2>
//           <p className={styles.text}>
//             If you can't find this code, be sure to check your spam.
//           </p>
//         </CardText>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup className="position-relative">
//             <Label htmlFor="code">CODE</Label>
//             <Input
//               type="text"
//               name="code"
//               value={code}
//               onChange={(e) => handleChange(e)}
//             />
//           </FormGroup>
//           <Input type="submit" value="SEND" />
//         </Form>
//       </Card>
//     </div>
//   );
// }

// export default Authenticate;
