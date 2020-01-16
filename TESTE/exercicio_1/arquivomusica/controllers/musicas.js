const Musicas = require("../models/musica");

module.exports.list = () => {
  return Musicas.find({}, { _id: 0, id: 1, titulo: 1, compositor: 1, tipo: 1 });
};

module.exports.findById = id => {
  return Musicas.find({ id: id });
};

module.exports.types = () => {
  return Musicas.distinct("tipo");
};

module.exports.findByComposer = composer => {
  return Musicas.find({ compositor: composer });
};

module.exports.findByInstrument = instrument => {
  return Musicas.find({
    instrumentos: { $elemMatch: { designacao: instrument } }
  });
};

module.exports.teste = () => {
  return Musicas.find({}, { instrumentos: 1 });
};
