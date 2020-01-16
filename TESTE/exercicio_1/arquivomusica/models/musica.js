const mongoose = require("mongoose");

const Instrumento = mongoose.Schema({
  designacao: String,
  partitura: {
    path: String
  }
});

const Musica = mongoose.Schema({
  id: String,
  tipo: String,
  titulo: String,
  compositor: String,
  instrumentos: [Instrumento]
});

module.exports = mongoose.model("musica", Musica);
