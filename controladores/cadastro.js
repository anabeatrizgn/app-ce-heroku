const knex = require("../conexao");
const bcrypt = require("bcrypt");

const cadastro = async (req, res) => {
  const { nome, email, senha, cep, cidade } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!email) {
    return res.status(404).json("O campo email é obrigatório");
  }

  if (!senha) {
    return res.status(404).json("O campo senha é obrigatório");
  }
  if (!cep) {
    return res.status(404).json("O campo cep é obrigatório");
  }
  if (!cidade) {
    return res.status(404).json("O campo cidade é obrigatório");
  }

  try {
    const validarEmail = await knex("usuarios").where({ email }).first();

    if (validarEmail) {
      return res.status(400).json("Email já cadastrado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const cepEmInt = Number(cep);

    const usuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
        cep: cepEmInt,
        cidade,
      })
      .returning("*");

    if (!usuario) {
      return res.status(400).json("Não foi possível cadastrar usuário");
    }

    return res.status(200).json("Cadastro realizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = cadastro;
