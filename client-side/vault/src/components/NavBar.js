import image from "../assets/logo_elfou.png";
import searchLogo from "../assets/search-icon.png";
import "../style/NavStyle.css";
import { Button } from "@mui/material";

function NavBar({ setStr, Str, open }) {
  return (
    <div id="nav">
      <a href="/">
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
      <div className="login">
        <Button
          id="log-btn"
          size="small"
          variant="outlined"
          onClick={open}
          style={{
            fontSize: "2.5vh",
          }}
        >
          login
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
