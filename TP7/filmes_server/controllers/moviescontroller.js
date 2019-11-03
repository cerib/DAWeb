const Movie = require("../models/Movie");

module.exports.list = () => {
  return Movie.find()
    .sort({ title: 1 })
    .exec();
};

module.exports.findById = id => {
  return Movie.findById(id);
};

module.exports.delete = id => {
  return Movie.deleteOne({ _id: id });
};

module.exports.insert = newMovie => {
  return Movie.create(newMovie);
};

module.exports.update = (id, fieldsToUpdate) => {
  return Movie.updateOne({ _id: id }, fieldsToUpdate);
};
