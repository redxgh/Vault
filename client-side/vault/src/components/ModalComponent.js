import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { RxCrossCircled } from "react-icons/rx";
import "../style/modalStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router";
function ModalComponent({ open, handleClose }) {
  const navigate = useNavigate();
  async function handleLogin() {
    let user = document.querySelector(".iuser");
    let sendUSer = user.value;
    let pass = document.querySelector(".ipass");
    let sendPass = pass.value;

    await axios
      .post("/login", { user: sendUSer, password: sendPass })
      .then(async (response) => {
        //console.log(response);
        //console.log(response.data)
        let res = response.data;
        if (res === "wrong user") {
          setText("wrong username");
          setAclass("Alert");
        } else if (res === "wrong password") {
          setText("wrong password");
          setAclass("Alert");
        } else if (res === "error") {
          setText("wrong password");
          setAclass("Alert");
        } else {
          let tokArr = [];
          tokArr.push(res);
          let token = JSON.stringify(tokArr);
          localStorage.setItem("tok", token);
          setText("");
          navigate("/admin");
        }
      })
      .catch((error) => {
        setText("error");
        setAclass("Alert");
        console.log(error);
      });
  }
  const [text, setText] = useState("");
  const [aclass, setAclass] = useState("noAppear");
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <div className="modal-container">
          <div className="modal-header">
            <h1>Admin Panel</h1>
            <span>
              <RxCrossCircled className="close-icon" onClick={handleClose} />
            </span>
          </div>
          <input type={"text"} placeholder={"User Name"} className="iuser" />
          <input
            type={"password"}
            placeholder={"Master Password"}
            className="ipass"
          />
          <div className={aclass}>
            <p>{text}</p>
          </div>
          <Button
            variant="contained"
            className="login-btn"
            onClick={handleLogin}
          >
            submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;
