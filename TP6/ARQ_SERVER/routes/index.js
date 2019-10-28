var express = require("express");
var router = express.Router();
var jsonfile = require("jsonfile");
var uniqid = require("uniqid");

var myBD = __dirname + "/../arqs.json";

/* GET home page. */
router.get("/", function(req, res, next) {
  jsonfile.readFile(myBD, (_error, data) => {
    if (!_error) {
      res.render("index", { lista: data });
    } else {
      res.render("error", _error);
    }
  });
});

router.get("/arq", (req, res, next) => {
  res.redirect("/");
});

router.get("/edit*", (req, res, next) => {
  res.redirect("/");
});

router.post("/new", (req, res, next) => {
  jsonfile.readFile(myBD, (error, arq) => {
    if (!error) {
      req.body.id = uniqid();
      let newArq = req.body;
      arq.push(newArq);
      jsonfile.writeFile(myBD, arq, error => {
        if (error) {
          res.render("error", error);
        } else {
          res.redirect("/");
        }
      });
    }
  });
});

router.put("/arq/update/:id", (req, res, next) => {
  console.log("Id a actualizar: " + req.params.id);
  req.body.id = req.params.id;
  jsonfile.readFile(myBD, (error, arqs) => {
    if (!error) {
      let index = arqs.findIndex(x => x.id === req.body.id);
      arqs[index] = req.body;
      jsonfile.writeFile(myBD, arqs, error => {
        if (!error) {
          console.log("Successfully edited arq of id " + req.body.id);
          res.sendStatus(200);
        } else {
          res.sendStatus(400).render("error", error);
        }
      });
    } else {
      res.sendStatus(400).render("error", error);
    }
  });
});

router.get("/arq/:id", (req, res, next) => {
  jsonfile.readFile(myBD, (error, arqs) => {
    if (!error) {
      let arq = arqs.find(obj => obj.id === req.params.id);
      res.render("show_arq", { arq }); //{arq} ou {arq: arq} ?
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  jsonfile.readFile(myBD, (error, arqs) => {
    if (!error) {
      let index = arqs.findIndex(x => x.id === id);
      arqs.splice(index, 1);
    } else {
      res.render("error", error);
    }

    jsonfile.writeFile(myBD, arqs, error => {
      if (error) {
        res.sendStatus(400).render("error", error);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
