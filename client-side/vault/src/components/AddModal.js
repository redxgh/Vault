import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { RxCrossCircled } from "react-icons/rx";
import "../style/modalStyle.css";
import "../style/addModalStyle.css";

function AddModal({ open, handleClose, update }) {
  const [text, setText] = useState("");
  const [aclass, setAclass] = useState("noAppear");
  function verif(title, descr, link, image) {
    if (
      title.length >= 5 &&
      title.length <= 15 &&
      link.length >= 8 &&
      link.length <= 500 &&
      descr.length >= 10 &&
      descr.length <= 25 &&
      image
    ) {
      return true;
    } else {
      setText(`the link must be 10 and 500 characters and in this form : http(s)://www.exemple.exemple or : 111.111.111.111 \n
      the title length must be between 5 and 15 characters long \n
      the description length must be between 10 and 25 characters long `);
      setAclass("Alert");
      console.log("error");
      return false;
    }
  }
  async function handleUplod() {
    let linkC = document.getElementById("link");
    let titleC = document.getElementById("title");
    let descC = document.getElementById("desc");
    let imageC = document.getElementById("img");
    let link = linkC.value;
    let title = titleC.value;
    let descr = descC.value;
    let image = imageC.files[0];
    if (verif(title, descr, link, image)) {
      const formData = new FormData();
      formData.append("link", link);
      formData.append("title", title);
      formData.append("descr", descr);
      formData.append("image", image);
      axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(async (response) => {
          setText("");
          setAclass("noAppear");
          await update();
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("errorr");
    }
  }
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
            <h1>Add Site</h1>
            <span>
              <RxCrossCircled className="close-icon" onClick={handleClose} />
            </span>
          </div>
          <div className="body-container">
            <input type={"text"} placeholder="link" id="link" required></input>
            <input
              type={"text"}
              placeholder="title"
              id="title"
              required
            ></input>
            <input
              type={"text"}
              placeholder="description"
              id="desc"
              required
            ></input>
            <input
              type={"file"}
              name={"image"}
              accept="image/png, image/gif, image/jpeg"
              id="img"
              required
            ></input>
            <hr />
            <div className={aclass}>
              <p>{text}</p>
            </div>
            <Button variant="contained" onClick={handleUplod}>
              Add Site
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddModal;
