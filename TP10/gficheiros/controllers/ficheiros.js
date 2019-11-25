var Ficheiro = require("../models/ficheiros");
module.exports.listar = () => {
  return Ficheiro.find().exec();
};

module.exports.findByName = name => {
  return Ficheiro.find({ name: name });
};
