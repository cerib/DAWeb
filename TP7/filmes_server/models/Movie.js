const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  cast: {
    type: []
  },
  genres: {
    type: []
  }
});

module.exports = mongoose.model("Movies", movieSchema);
