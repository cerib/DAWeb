const http = require("http");
const fs = require("fs");

// let numberOfFiles = -1;
let arq2html = "";

/*
const contaFicheiros = function(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, files) => {
      resolve(files.length);
    });
  });
};
*/

const lerFicheiro = function(path) {
  return new Promise(resolve => {
    resolve(fs.readFileSync(path));
  });
};

const servidor = http.createServer(function(req, res) {
  let partes = req.url.split("/");
  let pagina = partes[partes.length - 1];
  if (!isNaN(pagina)) {
    fs.readFile("dataset/arq" + pagina + ".xml", (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Ficheiro inexistente: " + pagina + "</h1>");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.write(data);
        res.end();
      }
    });
  } else if (pagina === "arq2html.xsl") {
    res.writeHead(200, { "Content-Type": "text/xsl" });
    res.write(arq2html);
    res.end();
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Ficheiro inexistente: " + pagina + "</h1>");
    res.end();
  }
});

const setup = async function() {
  //numberOfFiles = await contaFicheiros("./dataset"); //em princípio já não uso isto
  arq2html = await lerFicheiro("arq2html.xsl");
  servidor.listen(7777);
};
setup();
