const knex = require("../conexao");

const listarFornecedores = async (req, res) => {
  const { demanda_kwh } = req.query;

  try {
    const fornecedores = await knex("fornecedores").where(
      "minimo_kwh",
      "<=",
      `${demanda_kwh}`
    );

    if (fornecedores.length === 0) {
      return res
        .status(200)
        .json("Não há fornecedores compatíveis com a demanda informada");
    }

    return res.status(200).json(fornecedores);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = listarFornecedores;
