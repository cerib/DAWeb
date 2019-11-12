const obra = require("../models/obrasModel");

module.exports.list = () => {
  return obra.find();
};

module.exports.findById = id => {
  return obra.find({ _id: id });
};
10;

module.exports.findByComposer = composer => {
  return obra.find({ compositor: composer });
};

module.exports.findByComposerDuration = (composer, duration) => {
  return obra.find({ compositor: composer, duracao: duration });
};

module.exports.findByYear = year => {
  return obra.find({ anoCriacao: year });
};

module.exports.findByPeriod = period => {
  return obra.find({ periodo: period });
};

module.exports.findComposers = () => {
  return obra.distinct("compositor");
};

module.exports.findPeriods = () => {
  return obra.distinct("periodo");
};
