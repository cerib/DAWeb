const http = require("http");
const fs = require("fs");

let numberOfFiles = -1;

const contaFicheiros = function() {
  return new Promise(resolve => {
    fs.readdir("./xml", (err, files) => {
      resolve(files.length);
    });
  });
};

const servidor = http.createServer(function(req, res) {
  let partes = req.url.split("/");
  let pagina = partes[partes.length - 1];
  if (!isNaN(pagina) && numberOfFiles > 0 && pagina <= numberOfFiles) {
    fs.readFile("xml/arqueo-" + pagina + ".xml", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.write("Ficheiro inexistente: " + pagina);
    res.end();
  }
});

const setup = async function() {
  numberOfFiles = await contaFicheiros();
  servidor.listen(7777);
};
setup();
