var express = require("express");
var router = express.Router();
const fs = require("fs");
var Ficheiros = require("../controllers/ficheiros");
var Ficheiro = require("../models/ficheiros");

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

/* GET da lista de ficheiros */
router.get("/ficheiros", function(req, res) {
  Ficheiros.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.post("/ficheiros", upload.array("ficheiro"), function(req, res) {
  req.files.map((file, index) => {
    let oldPath = __dirname + "/../" + file.path;
    let newPath = __dirname + "/../public/ficheiros/" + file.originalname;
    console.log(oldPath);
    console.log(newPath);

    fs.rename(oldPath, newPath, function(err) {
      if (err) {
        throw err;
      }
    });

    let data = new Date();

    console.log(req.body.dsc[index]);

    let novoFicheiro = new Ficheiro({
      data: data.toISOString(),
      desc: req.body.dsc[index],
      name: file.originalname,
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
  /*
  let oldPath = __dirname + "/../" + req.file.path;
  console.log(oldPath);
  let newPath = __dirname + "/../public/ficheiros/" + req.file.originalname;

  fs.rename(oldPath, newPath, function(err) {
    if (err) throw err;
  });

  let data = new Date();

  let novoFicheiro = new Ficheiro({
    data: data.toISOString(),
    desc: req.body.dsc,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  });

  novoFicheiro.save(function(err, ficheiro) {
    if (!err) console.log("Ficheiro guardado com sucesso!");
    else console.log("ERRO: " + err);
    res.redirect("/");
  });
  */
  res.redirect("/");
});

module.exports = router;
