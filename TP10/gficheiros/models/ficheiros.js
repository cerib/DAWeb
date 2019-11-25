const mongoose = require("mongoose");

var ficheiroSchema = new mongoose.Schema({
  data: String,
  desc: String,
  name: String,
  originalname: String,
  mimetype: String,
  size: Number
});

module.exports = mongoose.model("ficheiro", ficheiroSchema);
