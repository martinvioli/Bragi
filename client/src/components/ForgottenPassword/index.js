import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./submitEmail.module.css";
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

function SubmitEmail(){
    const [input, setInput] = useState({
        email: "",
        code: ""
    });
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleDisabled = () => setDisabled(true);
    const handleShow = () => setShow(!show);
    const handleShow2 = () => setShow2(!show2);

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(api.forgottenPasswordPre, input);
    setInput({
        email: response.data.findUser.email ? response.data.findUser.email : "",
    });
    console.log(response)

    // if(response.status === 200) setInput({ email: "" });navigate('/recoverpost')
};

    const handleChangeAuth = (e) => {
        e.preventDefault();
        setInput({
            ...input,
        [e.target.name]: e.target.value,
        });
    };

    const handleClickAuth = async (e) => {
    e.preventDefault();
    console.log(input)
    try {
        if(input.email && input.code) {
            console.log("me ejecute")
            const response = await axios.post(`${api.authenticateUrl}reset`, input); //encontrar el email
            // console.log("handleClick ok", response.status)
            if(response.status === 200) {
                console.log("yo si el resto no")
            const emailSend = await axios.post(`${api.authenticateUrl}codeValidation`, input)
            if(emailSend.status === 200)  navigate('/resetPassword')
            console.log(emailSend)
            }
        }
        setInput({email: "", code: ""})
    } catch (e) {
    Swal.fire({
        title: "Oops...",
        text: "Wrong code. Please, try again.",
        icon: "error",
        cancelButtonText: "Close",
        cancelButtonColor: "#E74C3C ",
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  };

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
                            handleShowModal();
                            handleSubmit(e);
                            handleDisabled();
                        }}
                        style={{ marginBottom: "2em" }}
                    >
                        <p style={{ fontWeight: "bold", marginLeft: "15px"}}>Enter your email in order to resert your password</p>
                        <FormGroup className="position-relative">
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={(e) => handleChange(e)}
                                invalid={errors.email ? true : false}
                                valid={!errors.email && input.email ? true : false}
                            />
                            {errors.email ? (
                                <FormFeedback tooltip>{errors.email}</FormFeedback>
                            ) : (
                                <FormFeedback tooltip></FormFeedback>
                            )}
                        </FormGroup>
                            {errors.email ||
                            !input.email ? (
                                <Input type="submit" disabled value="This is my email" />
                            ) : (
                                <Input
                                type="submit"
                                className="btn-primary btn"
                                value="This is my email"
                                disabled={disabled}
                                />
                            )}
                            </Form>

            <Link to="/" style={{ textDecoration: "none" }}>
                <Button color="primary" style={{ marginTop: "2em" }}>
                    Back
                </Button>
            </Link>

            {/* MODAL SECTION*/}
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
                    Please, keep it, you should use it again later.
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
            </Modal>
            </div>
        </motion.div>
      </div>
    );
}

export default SubmitEmail;