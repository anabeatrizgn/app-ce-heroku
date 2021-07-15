const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaHash = require("../senhaHash");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("Campos E-mail e Senha são obrigatórios");
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(200).json("E-mail e Senha não conferem");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(200).json("E-mail e Senha não conferem");
    }

    const token = jwt.sign({ id: usuario.id }, senhaHash);

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = login;
