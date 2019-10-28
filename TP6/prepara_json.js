//Necessário instalar os módulos jsonfile e uniqid
//npm install jsonfile
//npm install uniqid

const jsonfile = require("jsonfile");
const uniqid = require("uniqid");

const json = "./ARQ_SERVER/arqs.json";

jsonfile.readFile(json, (error, arqs) => {
  if (!error) {
    arqs.map(a => (a.id = uniqid()));
    jsonfile.writeFile(json, arqs, error => {
      if (error) {
        console.log("Error occurred while writing file: ");
        console.log(error);
      }
    });
  } else {
    console.log("Error occurred while reading file: ");
    console.log(error);
  }
});
