var express = require("express");
var router = express.Router();
const Award = require("../controllers/awardController");

router.get("/premios", async function(req, res, next) {
  try {
    let category = req.query.categoria;
    let yearBiggerThan = req.query.data;
    if (yearBiggerThan && category) {
      let awards = await Award.listCategoryYearBiggerThan(
        category,
        yearBiggerThan
      );
      res.json(awards);
    } else if (category) {
      let awards = await Award.listByCategory(category);
      res.json(awards);
    }
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/premios/", async function(req, res, next) {
  try {
    let awards = await Award.list();
    res.json(awards);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/premios/:id", async (req, res, next) => {
  try {
    const award = await Award.getById(req.params.id);
    res.json(award);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/categorias", async (req, res, next) => {
  try {
    const categories = await Award.nobelCategories();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

router.get("/laureados", async (req, res, next) => {
  try {
    const laureates = await Award.listLaureates();
    res.json(laureates);
  } catch (error) {
    console.log(error);
    res.status(400).render("error");
  }
});

module.exports = router;
