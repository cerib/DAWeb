var express = require("express");
var router = express.Router();
const axios = require("axios");

const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ";

/* GET home page. */
router.get("/", function(req, res, next) {
  let _url = "http://clav-api.dglab.gov.pt/api/entidades?apikey=" + apikey;
  axios
    .get(_url)
    .then(response => res.render("index", { entidades: response.data }))
    .catch(err => console.log("ERRO!! " + err));
});

router.get("/tipologia/:id", (req, res, next) => {
  let urlTipologia = `http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}?apikey=${apikey}`;
  let urlGetEntidades = `http://clav-api.dglab.gov.pt/api/tipologias/${req.params.id}/elementos?apikey=${apikey}`;
  axios
    .all([axios.get(urlTipologia), axios.get(urlGetEntidades)])
    .then(
      axios.spread((tipologia, entidades) => {
        //console.log(tipologia.data);
        //console.log(entidades.data);
        res.render("tipologia_view", {
          entidades: entidades.data,
          tipologia: tipologia.data
        });
      })
    )
    .catch(error => console.log(error));
});

router.get("/:id", (req, res, next) => {
  let urlEnt = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.id}?apikey=${apikey}`;
  let urlTipo = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.id}/tipologias?apikey=${apikey}`;
  let urlDono = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.id}/intervencao/dono?apikey=${apikey}`;
  let urlParticipante = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.id}/intervencao/participante?apikey=${apikey}`;
  axios
    .all([
      axios.get(urlEnt),
      axios.get(urlTipo),
      axios.get(urlDono),
      axios.get(urlParticipante)
    ])
    .then(
      axios.spread((ent, tipo, dono, participante) => {
        res.render("entidade_view", {
          entidade: ent.data,
          tipologias: tipo.data,
          dono: dono.data,
          participa: participante.data
        });
      })
    )
    .catch(err => console.log("ERRO!! " + err));
});

module.exports = router;
