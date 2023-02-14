const express = require("express");
const bp = require("body-parser");
const app = express();
const cors = require("cors");
const bc = require("bcrypt");
const pool = require("./database");
const jwt = require("jsonwebtoken");
const checkPass = require("./checkPass.js");
const tokenGen = require("./tokeGen");
const tokenCheck = require("./tokenCheck");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");
let name;
app.use("/images", express.static("./images"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: async (req, file, cb) => {
    name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
app.use(cors());
app.use(bp.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(bp.urlencoded({ extended: true }));

app.get("/api", async (req, res, next) => {
  const result = await pool.query(`select * from sites`);
  res.send(result.rows);
});

app.post("/api", (req, res, next) => {
  res.send("info recieved");
});
app.post("/signup", async (req, res, next) => {
  let user = req.body.user;
  let passsword = req.body.password;
  bc.genSalt(10, function (err, salt) {
    bc.hash(passsword, salt, async function (err, hash) {
      await pool.query(
        `inset into users(username,password) values('${user}','${hash}')`
      );
      res.status(200).send("success account created");
    });
  });
});
app.post("/login", async (req, res) => {
  let userTrue = true;
  let passTrue = true;
  let plainPass;
  let hashedPass;
  let retUser;
  let token;
  try {
    let queryResult = await pool.query(
      `select password from users where username = '${req.body.user}'`
    );
    let pass = queryResult.rows;
    plainPass = req.body.password;
    hashedPass = pass[0].password;
    retUser = pass[0].username;
  } catch (err) {
    userTrue = false;
  }

  if (userTrue) {
    if (await checkPass(hashedPass, plainPass)) {
      token = tokenGen(retUser);
    } else {
      passTrue = false;
    }
  }
  let result;
  if (userTrue && passTrue) {
    result = { token: token, user: req.body.user };
  }
  if (!userTrue) {
    result = "wrong user";
  }
  if (userTrue && !passTrue) {
    result = "wrong password";
  }
  if (!userTrue && !passTrue) {
    result = "wrong user and password";
  }
  res.status(200).send(result);
});
app.post("/checkLogin", async (req, res) => {
  let token = req.body.token.token;

  let checkedToken = tokenCheck(token);
  let result;
  if (checkedToken) {
    result = true;
  } else {
    result = false;
  }
  //console.log(result);
  res.status(200).send(result);
});
app.post("/delete", async (req, res, next) => {
  let id = await req.body.id;
  let success = true;
  try {
    await pool.query(`delete from sites where id = ${id}`);
  } catch (err) {
    console.log(err);
    success = false;
  }
  res.send(success);
});
app.post("/upload", upload.single("image"), async (req, res, next) => {
  let link = req.body.link;
  let title = req.body.title;
  let desc = req.body.descr;
  let image = await name;
  try {
    pool.query(
      `INSERT INTO sites(link, title,descr,image)
      VALUES ('${link}', '${title}', '${desc}', '${image}');`
    );
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("success");
});
/*app.post("/update", async (req, res, next) => {
  let link = req.body.link;
  let title = req.body.title;
  let desc = req.body.descr;
  let id = req.body.id;
  console.log("the id is :", id);
  await pool.query(`UPDATE sites
  SET link = '${link}',
      title = '${title}',
      descr = '${desc}'
      where id = ${id};`);
});*/
app.post("/gen", async (req, res, next) => {
  let pass = req.body.password;
  let hashed = await bc.hash(pass, 10);
  res.send(hashed).status(200);
});
app.listen(3080, () => console.log("server started on port 3080"));
