const http = require("http");
const url = require("url");
const pug = require("pug");
const fs = require("fs");
const jsonfile = require("jsonfile");
const { parse } = require("querystring");
const myBD = "tarefas.json";
const uuid = require("uuid/v1");
const myServer = http.createServer((req, res) => {
  let purl = url.parse(req.url, true);

  console.log(req.method + " " + purl.pathname);

  if (req.method === "GET") {
    if (purl.pathname === "/") {
      jsonfile.readFile(myBD, (erro, tarefas) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        if (!erro) {
          res.write(pug.renderFile("layouts/index.pug", { lista: tarefas }));
        } else {
          res.write(pug.renderFile("layouts/erro.pug", { e: erro }));
        }
        res.end();
      });
    } else if (purl.pathname === "/w3.css") {
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.readFile("stylesheets/w3.css", (erro, dados) => {
        if (!erro) {
          res.write(dados);
        } else {
          res.write(pug.renderFile("layouts/erro.pug", { e: erro }));
        }
        res.end();
      });
    }
  } else if (req.method === "POST") {
    if (purl.pathname === "/novatarefa") {
      recuperaInfo(req, resultado => {
        delete resultado["Enviar"];
        resultado["id"] = uuid();
        console.log(resultado);
        jsonfile.readFile(myBD, (erro, tarefas) => {
          if (!erro) {
            tarefas.push(resultado);
            jsonfile.writeFile(myBD, tarefas, erro => {
              if (erro) {
                console.log(erro);
              } else {
                console.log("Registo com sucesso");
                res.writeHead(302, {
                  Location: "/"
                });
                res.end();
              }
            });
          }
        });
      });
    } else if (purl.pathname === "/apagar") {
      console.log("a apagar...");
      recuperaInfo(req, resultado => {
        console.log(resultado);
        jsonfile.readFile(myBD, (erro, tarefas) => {
          if (!erro) {
            let tarefasFiltered = tarefas.filter(function(tarefa) {
              return tarefa.id !== resultado["id"];
            });
            jsonfile.writeFile(myBD, tarefasFiltered, erro => {
              if (erro) {
                console.log(erro);
              } else {
                console.log("Apagado com sucesso");
                res.writeHead(302, {
                  Location: "/"
                });
                res.end();
              }
            });
          }
        });
      });
    }
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    console.log("ERRO: " + req.method + " não suportado");
    res.write(
      pug.renderFile("layouts/erro.pug", {
        e: "ERRO: " + req.method + " não suportado"
      })
    );
    res.end();
  }
});

myServer.listen(7777, () => {
  console.log("Servidor à escuta em 7777");
});

function recuperaInfo(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", bloco => {
      body += bloco.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  }
}
