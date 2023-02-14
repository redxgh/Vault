import React from "react";
import AdminNav from "./AdminNav";
import Cards from "./AdminCards";
import AddModal from "./AddModal";
import { useState, useEffect } from "react";
import "../style/index.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate } from "react-router";
//import ModModal from "./ModModal";

function AdminHome() {
  const [open, setOpen] = useState(false);
  //const [openMod, setOpenMod] = useState(false);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);
  let navigate = useNavigate();
  async function updateSites() {
    await axios
      .get("/api")
      .then((res) => {
        //console.log("done");
        setSites([...res.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    async function checkLogin(token) {
      await axios
        .post("/checkLogin", { token: token })
        .then((response) => {
          setLogin(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
    }
    setLoading(true);
    if (localStorage.length > 0) {
      let token = localStorage.getItem("tok");
      let tokArr = JSON.parse(token);
      checkLogin(tokArr[0]);
    } else {
      setLogin(false);
    }
    (async () => {
      await axios
        .get("/api")
        .then((res) => {
          //console.log(res.data);
          setSites([...res.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [navigate]);
  const [Str, setStr] = useState("");
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  /*function handleOpenM() {
    setOpenMod(true);
  }*/
  /*function handleCloseM() {
    console.log("done");
    setOpenMod(false);
    localStorage.removeItem("currentId");
  }*/

  if (login) {
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
            {/*<ModModal
              open={openMod}
              setOpenMod={setOpenMod}
              sites={sites}
              setSites={setSites}
              ></ModModal>*/}
            <AddModal
              open={open}
              handleClose={handleClose}
              update={updateSites}
            ></AddModal>
            <AdminNav
              setStr={setStr}
              str={Str}
              open={open}
              setOpen={handleOpen}
            ></AdminNav>
            <Cards
              sites={sites}
              Str={Str}
              className="cards"
              update={updateSites}
            ></Cards>
          </div>
        )}
      </div>
    );
  } else {
    navigate("/");
  }
}

export default AdminHome;
