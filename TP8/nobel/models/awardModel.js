const mongoose = require("mongoose");

const laureate = new mongoose.Schema({
  id: String,
  firstname: String,
  surname: String,
  motivation: String,
  share: String
});

const award = new mongoose.Schema(
  {
    year: String,
    category: String,
    laureates: [laureate]
  },
  { collection: "nobel" }
);

module.exports = mongoose.model("awards", award);
