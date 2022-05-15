import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgottenPassword.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import api from "../../Utils";
import { forgottenPassword } from "../../redux/actionCreators";
import { IoMdMusicalNotes } from "react-icons/io";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { motion } from "framer-motion/dist/framer-motion";
import validate from "../../Utils/validate";
import Swal from "sweetalert2";
import { FcApproval } from "react-icons/fc";

function ForgottenPassword(){
    const [input, setInput] = useState({
    code: "",
    password: "",
    repeatPassword: "",
  });
    const [errors, setErrors] = useState({
    password: "",
    repeatPassword: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
    const [inputToken, setInputToken] = useState({
    code: "",
    token: "",
  });
    const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
   const handleShow = () => setShow(!show);

  const handleShow2 = () => setShow2(!show2);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input)
    const response = await axios.put(api.forgottenPasswordPost, input);
    console.log(response)

    if(response.data.msg){ 
        Swal.fire({
            title: "✅",
            text: "Your password has been successfully reseted, wlcome back",
            icon: "success",
            showConfirmButton: true,
            confirmButtonColor: "#0d6efd",
            timer: 2000,
        });
        navigate('/')
    }
};
//     setInputToken({
//       ...inputToken,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleClickAuth = async (e) => {
//     e.preventDefault();
//     try {
//         if (inputToken.token && inputToken.code) {
//             const response = await axios.post(`${api.authenticateUrl}`, inputToken);
//             if (response.data.msg) {
//             Swal.fire({
//                 title: "🎉🎊",
//                 text: "Congratulations, you are now officially a member of this beatiful community!.",
//                 icon: "success",
//                 showConfirmButton: true,
//                 confirmButtonColor: "#0d6efd",
//                 timer: 2000,
//             });
//             navigate("/home");
//             }
//             setInputToken({
//                 code: "",
//                 token: "",
//             });
//         }
//     } catch (e) {
//         Swal.fire({
//             title: "Oops...",
//             text: "Wrong code. Please, try again.",
//             icon: "error",
//             cancelButtonText: "Close",
//             cancelButtonColor: "#E74C3C ",
//             showCancelButton: true,
//             showConfirmButton: false,
//         });
//     }
//   };


    return (
        <div className={styles.container}>
            <motion.div
                className={styles.background}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={styles.form}>
                    <IoMdMusicalNotes className={styles.logoMusic} />
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        style={{ marginBottom: "2em" }}
                    >
                        <FormGroup className="position-relative">
                            <Label htmlFor="password">Insert again the code:</Label>
                            <Input
                                type="text"
                                name="code"
                                placeholder="Please insert your code here..."
                                value={input.code}
                                onChange={(e) => handleChange(e)}
                            />
                        </FormGroup>
                        <FormGroup
                            className="position-relative"
                            style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
                        >
                            <Label htmlFor="password">New password:</Label>
                            <Input
                                type={show ? "text" : "password"}
                                name="password"
                                value={input.password}
                                onChange={(e) => handleChange(e)}
                                invalid={errors.password ? true : false}
                                valid={!errors.password && input.password ? true : false}
                                style={{ paddingLeft: "2.5em" }}
                            />
                            <input
                                type="button"
                                onClick={handleShow}
                                value="👁"
                                style={{
                                    border: "none",
                                    backgroundColor: "#ffffff00",
                                    top: "2.4em",
                                    position: "absolute",
                                    borderRight: "1px solid rgb(197, 197, 197)",
                                    display: "inline",
                                }}
                            />

                            {errors.password ? (
                                <FormFeedback tooltip>{errors.password}</FormFeedback>
                            ) : (
                                <FormFeedback tooltip></FormFeedback>
                            )}
                        </FormGroup>

                        <FormGroup
                            className="position-relative"
                            style={{ display: "inline-block", width: "48%", marginLeft: "2%" }}
                        >
                        <Label htmlFor="repeatPassword">Repeat new password:</Label>
                        <Input
                        type={show2 ? "text" : "password"}
                        name="repeatPassword"
                        value={input.repeatPassword}
                        onChange={(e) => handleChange(e)}
                        invalid={errors.repeatPassword ? true : false}
                        valid={
                            !errors.repeatPassword && input.repeatPassword ? true : false
                        }
                        style={{ paddingLeft: "2.5em" }}
                        />
                        <input
                        type="button"
                        onClick={handleShow2}
                        value="👁"
                        style={{
                            border: "none",
                            backgroundColor: "#ffffff00",
                            top: "2.4em",
                            position: "absolute",
                            borderRight: "1px solid rgb(197, 197, 197)",
                            display: "inline",
                        }}
                        />
                        <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
                        {errors.repeatPassword ? (
                        <FormFeedback tooltip>{errors.repeatPassword}</FormFeedback>
                        ) : (
                        <FormFeedback tooltip></FormFeedback>
                        )}
                    </FormGroup>
                    {errors.password ||
                    errors.repeatPassword||
                    !input.password ||
                    !input.repeatPassword ? (
                        <Input type="submit" disabled value="Reset my password" />
                    ) : (
                        <Input
                        type="submit"
                        className="btn-primary btn"
                        value="Reset my password"
                        disabled={disabled}
                        />
                    )}
                </Form>

            <Link to="/" style={{ textDecoration: "none" }}>
                <Button color="primary" style={{ marginTop: "2em" }}>
                    Back
                </Button>
            </Link>

            {/* MODAL SECTION
            <Modal centered isOpen={showModal}>
                <ModalBody
                    className="bg-light rounded-1"
                    style={{ textAlign: "center" }}
                >
                    <FcApproval style={{ width: "2em", height: "2em" }} />
                    <h2 className={styles.subtitle}>
                    Hello, welcome again to
                    <p className={"text-primary"}>BRAGI</p>
                    <hr />
                    </h2>
                    <p className={styles.text}>
                    We have sent you an email with a code to reset your password. If you can't
                    find it, be sure to check your spam.
                    </p>
                    <FormGroup className="position-relative">
                    <Input
                        type="text"
                        name="code"
                        placeholder="Please insert your code here..."
                        value={input.code}
                        onChange={(e) => handleChangeAuth(e)}
                    />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="bg-light rounded-1">
                    <Button color="primary" onClick={handleClickAuth}>
                        This is my email
                    </Button>
                </ModalFooter>
            </Modal> */}
            </div>
        </motion.div>
      </div>
    );
}

export default ForgottenPassword;