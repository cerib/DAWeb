const express = require("express");
const router = express.Router();
const axios = require("axios");
const lhost = require("../config/env").host;

const Ficheiros = require("../controllers/ficheiros");
const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res) {
  axios
    .get(lhost + "/api/ficheiros")
    .then(dados => {
      res.render("index", { lista: dados.data });
    })
    .catch(erro => {
      res.render("error", { error: erro });
    });
});

/* Download a file */
router.get("/download/:fnome", function(req, res) {
  Ficheiros.findByName(req.params.fnome)
    .then(fileEntry => {
      let file = fileEntry[0];
      if (file) {
        let path = __dirname + "/../public/ficheiros/";
        //rename file to original name, with "download_" as a code injection safeguard
        fs.rename(
          path + req.params.fnome,
          path + "download_" + file.originalname,
          err => {
            if (!err) {
              res.download(path + "download_" + file.originalname);
              //rename back file to unique id name
              fs.rename(
                path + "download_" + file.originalname,
                path + req.params.fnome,
                err => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log("No file with that name found (" + req.params.fnome + ")");
      }
    })
    .catch(error => console.log(error));
});

module.exports = router;
