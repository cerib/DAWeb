var express = require("express");
var router = express.Router();
const fs = require("fs");
var Ficheiros = require("../controllers/ficheiros");
var Ficheiro = require("../models/ficheiros");

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const uniqid = require("uniqid");

/* GET da lista de ficheiros */
router.get("/ficheiros", function(req, res) {
  Ficheiros.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.post("/ficheiros", upload.array("ficheiro"), function(req, res) {
  console.log(req.body);
  req.files.map((file, index) => {
    let oldPath = __dirname + "/../" + file.path;
    let newName = uniqid();
    let newPath = __dirname + "/../public/ficheiros/" + newName;

    fs.rename(oldPath, newPath, function(err) {
      if (err) {
        throw err;
      }
    });

    let data = new Date();

    console.log("desc: " + req.body.desc[index]);

    let novoFicheiro = new Ficheiro({
      data: data.toISOString(),
      desc: req.body.desc[index],
      name: newName,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    novoFicheiro.save(function(err, file) {
      if (!err) {
        console.log("Ficheiro guardado com sucesso!");
      } else console.log("ERRO: " + err);
    });
  });

  res.redirect("/");
});

module.exports = router;
