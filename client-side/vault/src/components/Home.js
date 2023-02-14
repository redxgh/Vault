import React from "react";
import NavBar from "./NavBar";
import Cards from "./Cards";
import { useState, useEffect } from "react";
import "../style/index.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import ModalComponent from "./ModalComponent";

function Home() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      await axios
        .get("/api")
        .then((res) => {
          //console.log(res.data);
          setSites([...res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 1);
  }, []);
  const [Str, setStr] = useState("");
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  return (
    <div className="Home">
      {loading ? (
        <ClipLoader
          color={"red"}
          loading={loading}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader-red"
        />
      ) : (
        <div>
          <NavBar setStr={setStr} str={Str} open={handleOpen}></NavBar>
          <Cards sites={sites} Str={Str} className="cards"></Cards>
          <ModalComponent
            open={open}
            handleClose={handleClose}
          ></ModalComponent>
        </div>
      )}
    </div>
  );
}

export default Home;
