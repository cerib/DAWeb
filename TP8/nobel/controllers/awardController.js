const Award = require("../models/awardModel");

module.exports.list = () => {
  return Award.find({}, { year: 1, category: 1, _id: 0 });
};

module.exports.getById = id => {
  return Award.findById(id);
};

module.exports.nobelCategories = () => {
  return Award.distinct("category");
};

module.exports.listCategoryYearBiggerThan = (category, year) => {
  return Award.find({ category: category, year: { $gt: year } });
};

module.exports.listByCategory = category => {
  return Award.find({ category: category });
};

module.exports.listLaureates = () => {
  return Award.aggregate([
    { $unwind: "$laureates" },
    {
      $group: {
        _id: {
          year: "$year",
          category: "$category",
          firstname: "$laureates.firstname",
          surname: "$laureates.surname"
        }
      }
    },
    {
      $project: {
        _id: 0,
        firstname: "$_id.firstname",
        surname: "$_id.surname",
        year: "$_id.year",
        category: "$_id.category"
      }
    },
    { $sort: { firstname: 1 } }
  ]);
};
