var express = require("express");
var router = express.Router();

const Musicas = require("../controllers/musicas");
/*
  try {
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
*/

/*
router.get("/teste", async function(req, res, next) {
  try {
    res.jsonp(await Musicas.teste());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
*/

router.get("/obras", async function(req, res, next) {
  try {
    if (req.query.compositor) {
      res.jsonp(await Musicas.findByComposer(req.query.compositor));
    } else if (req.query.instrumento) {
      console.log(req.query.instrumento);
      res.jsonp(await Musicas.findByInstrument(req.query.instrumento));
    } else {
      res.jsonp(await Musicas.list());
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/obras/:id", async function(req, res, next) {
  try {
    res.jsonp(await Musicas.findById(req.params.id));
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/tipos", async function(req, res, next) {
  try {
    res.jsonp(await Musicas.types());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
