var express = require("express");
var router = express.Router();
const obra = require("../controllers/obrasController"); //corrigir nome do ficheiros controller e model

router.get("/obras", async (req, res, next) => {
  try {
    let compositor = req.query.compositor;
    let duracao = req.query.duracao;
    let ano = req.query.ano;
    let periodo = req.query.periodo;
    if (ano) {
      let queryRes = await obra.findByYear(ano);
      res.json(queryRes);
    } else if (periodo) {
      let queryRes = await obra.findByPeriod(periodo);
      res.json(queryRes);
    } else if (compositor && duracao) {
      let queryRes = await obra.findByComposerDuration(compositor, duracao);
      res.json(queryRes);
    } else {
      let queryRes = await obra.list();
      res.json(queryRes);
      console.log(obras);
    }
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/obras/:id", async (req, res, next) => {
  try {
    let queryRes = await obra.findById(req.params.id);
    res.json(queryRes);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/compositores", async (req, res, next) => {
  try {
    let queryRes = await obra.findComposers();
    res.json(queryRes);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/periodos", async (req, res, next) => {
  try {
    let queryRes = await obra.findPeriods();
    res.json(queryRes);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

/*
router.get("/obras", async (req, res, next) => {
  try {
    let ano = req.query.ano;
    if (ano) {
      let queryRes = await obra.findByYear(ano);
      console.log(queryRes);
    }
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/obras", async (req, res, next) => {
  try {
    let periodo = req.query.periodo;
    if (periodo) {
      let queryRes = await obra.findByPeriod(periodo);
      console.log(queryRes);
    }
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});



router.get("/obras", async function(req, res, next) {
  try {
    let obras = await obra.list();
    console.log(obras);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

*/

module.exports = router;
