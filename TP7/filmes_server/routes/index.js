var express = require("express");
var router = express.Router();
const Movie = require("../controllers/moviescontroller");

router.get(["/"], async (req, res, next) => {
  try {
    const movies = await Movie.list();
    res.status(200).render("index", { movies: movies });
  } catch (error) {
    console.log(err);
    res.status(400).render("error", { error });
  }
});

router.get("/movie/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).render("show_movie", { movie });
  } catch (error) {
    console.log(err);
    res.status(400).render("error", { error });
  }
});

router.post("/movie/new", async (req, res, next) => {
  const movie = {
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast
      .split(",")
      .filter(e => e.trim().length != 0)
      .map(e => e.trim()),
    genres: req.body.genres
      .split(",")
      .filter(e => e.trim().length != 0)
      .map(e => e.trim())
  };

  try {
    const savedMovie = await Movie.insert(movie);
    console.log(savedMovie);
    res.status(200).redirect(`/movie/${savedMovie._id}`);
  } catch (error) {
    console.log(error);
    res.status(400).render("error", { error });
  }
});

router.put("/movie/update/:id", async (req, res, next) => {
  const fieldsToUpdate = req.body;
  const id = req.params.id;
  try {
    updatedMovie = await Movie.update(id, fieldsToUpdate);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).render("error", { error });
  }
});

router.delete("/movie/delete/:id", async (req, res, next) => {
  try {
    deletedMovie = await Movie.delete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).render("error", { error });
  }
});

module.exports = router;
