import React from "react";
import { MdError } from "react-icons/md";
import "../style/notStyle.css";
function NotFound() {
  return (
    <div className="not-container">
      <h1>
        Error 404 : this page is not found on our server <MdError></MdError>
      </h1>
    </div>
  );
}

export default NotFound;
