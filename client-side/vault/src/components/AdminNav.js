import React from "react";
import image from "../assets/logo_elfou.png";
import searchLogo from "../assets/search-icon.png";
import "../style/AdminNavStyle.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
function AdminNav({ setStr, Str, open, setOpen }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div id="nav-b">
      <a href="/admin">
        <img src={image} id="logo-elfou" alt="logo-elfouladh"></img>
      </a>
      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="How can I help you with today?"
          onChange={(e) => setStr(e.target.value)}
          value={Str}
        />
        <img className="search-icon" src={searchLogo} alt="search-logo" />
      </div>
      <div className="Login">
        <Button
          onClick={setOpen}
          variant="outlined"
          color="success"
          id="add-btn"
          size="small"
        >
          add site
        </Button>
        <Button
          id="log-btn"
          size="small"
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Lougout
        </Button>
      </div>
    </div>
  );
}

export default AdminNav;
