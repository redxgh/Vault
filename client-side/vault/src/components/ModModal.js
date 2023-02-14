/*import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { RxCrossCircled } from "react-icons/rx";
import "../style/modalStyle.css";
import "../style/addModalStyle.css";

function ModModal({ open, setOpenMod, sites, setSites }) {
  const [text, setText] = useState("");
  const [aclass, setAclass] = useState("noAppear");
  async function handleClose() {
    setOpenMod(false);
  }
  function verifyInput(link, title, descr) {
    if (link === "" || title === "" || descr === "") {
      return false;
    }
    return (
      10 <= link.length <= 500 &&
      5 <= title.length <= 15 &&
      10 <= descr.length <= 25
    );
  }
  async function updateSites() {
    await axios
      .get("/api")
      .then((res) => {
        console.log("done");
        setSites([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleEdit() {
    let ids = localStorage.getItem("currentId");
    let id = parseInt(ids);
    let linkC = document.getElementById("link");
    let titleC = document.getElementById("title");
    let descC = document.getElementById("desc");
    let link = linkC.value;
    let title = titleC.value;
    let descr = descC.value;
    axios
      .post("/update", { link: link, title: title, descr: descr, id: id })
      .then(async (response) => {
        setText("");
        setAclass("noAppear");
        await updateSites();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setText(`the link must be 10 and 500 characters and in this form : http(s)://www.exemple.exemple or : 111.111.111.111 \n
        the title length must be between 5 and 15 characters long \n
        the description length must be between 10 and 25 characters long `);
        setAclass("Alert");
        console.log("error");
      });
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
            <div className={aclass}>
              <p>{text}</p>
            </div>
            <Button variant="contained" onClick={handleEdit}>
              Add Site
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModModal;
*/
