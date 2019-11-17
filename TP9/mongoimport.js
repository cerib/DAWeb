const jsonfile = require("jsonfile");
const mongoose = require("mongoose");

let isJsonArray = false;

let dbName = "";
let colName = "";
let fPath = "";

processData = () => {
  if (fPath === "") {
    console.log("Please provide a valid path for the json file");
    return;
  }
  if (dbName === "" || colName === "") {
    console.log(
      "Error in argument structure, -d or -c arguments are invalid or don't exist"
    );
    return;
  }

  mongoose.connect("mongodb://127.0.0.1/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    let model = mongoose.model(colName, new mongoose.Schema({}));
    jsonfile.readFile(fPath, (error, data) => {
      if (error) {
        console.log("Error opening JSON file");
        console.log(error);
      } else {
        isJsonArray = Object.prototype.toString.call(data) === "[object Array]";
        if (!isJsonArray) {
          data = [data];
        }
        model.collection.insertMany(data, (error, res) => {
          if (error) {
            console.log("Error while inserting in DB");
            console.log(error);
          } else {
            console.log("Success!");
            db.close();
          }
        });
      }
    });
  });
};

process.argv.forEach((val, ind) => {
  // 0 e 1 sao is indices dos args "node" e "./mongoimport.js"
  if (ind > 1) {
    if (val === "-d") {
      dbName = process.argv[ind + 1];
    }
    if (val === "-c") {
      colName = process.argv[ind + 1];
    }
    if (val[0] === "." && val[1] === "/") {
      fPath = val;
    }
  }
  if (ind === process.argv.length - 1) {
    processData();
  }
});
