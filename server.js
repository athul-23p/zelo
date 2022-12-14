const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const multer = require('multer');
const upload = multer({dest:'./uploads'});

const pinataSDK = require("@pinata/sdk");

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());
// app.use(fileUpload());
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/mint",upload.single('document'), (req, res) => {
  console.log(req.file);
  // const options = {
  //   pinataMetadata: {
  //     name: req.files.file.name,
  //     keyvalues: {
  //       customKey: "customValue",
  //       customKey2: "customValue2",
  //     },
  //   },
  //   pinataOptions: {
  //     cidVersion: 0,
  //   },
  // };
  // pinata
  //   .pinFileToIPFS(req.files.file, options)
  //   .then((result) => {
  //     //handle results here
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     //handle error here
  //     console.log(err);
  //   });
  return res.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
