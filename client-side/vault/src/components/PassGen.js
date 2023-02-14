import React from "react";
import axios from "axios";
import "../style/passStyle.css";
function PassGen() {
  async function passwd(pass) {
    let hashPass = document.getElementById("hashed-pass");
    axios
      .post("/gen", { password: pass })
      .then(async (response) => {
        hashPass.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div
      className="body-pass"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="container-form"
        style={{
          width: "fit-content",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1vh",
          gap: "1vh",
          border: "1px solid black",
        }}
      >
        <h3>Generate Hashed Password</h3>

        <input
          className="input"
          type={"text"}
          id="normal-pass"
          placeholder="password here"
        ></input>
        <input
          className="input"
          type={"text"}
          id="hashed-pass"
          placeholder="hashed password"
        ></input>
        <button
          className="btn"
          onClick={() => {
            let pass = document.getElementById("normal-pass");
            let passVal = pass.value;
            passwd(passVal);
          }}
        >
          get hashed pass
        </button>
        <a href={"/"}>
          <button className="btn">home page</button>
        </a>
      </div>
    </div>
  );
}

export default PassGen;
