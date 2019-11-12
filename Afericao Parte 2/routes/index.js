var express = require("express");
var router = express.Router();
const axios = require("axios");

const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ";

/* GET home page. */
router.get("/", function(req, res, next) {
  let _url = "http://clav-api.dglab.gov.pt/api/entidades?apikey=" + apikey;
  axios
    .get(_url)
    .then(response => res.render("index", { entidades: response.data }))
    .catch(err => console.log("ERRO!! " + err));
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
