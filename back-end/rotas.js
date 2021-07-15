const express = require("express");
const login = require("./controladores/login");
const cadastro = require("./controladores/cadastro");
const listarFornecedores = require("./controladores/solicitacoes");
const autenticacao = require("./filtros/autenticacao");
const rotas = express();

rotas.post("/login", login);
rotas.post("/cadastro", cadastro);
// rotas.use(autenticacao);
rotas.get("/", listarFornecedores);
rotas.get("/teste", (req, res) => {
  res.send("ok");
});

module.exports = rotas;
