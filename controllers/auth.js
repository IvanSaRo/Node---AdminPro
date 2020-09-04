const { response } = require("express");

const Usuario = require("../models/user");

const bcrypt = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no válido",
      });
    }

    //Verificar password comparando el de body con el de BD
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // TODO generar el Token (JWT)

    res.json({
      ok: true,
      msg: "hola",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el adeministrador",
    });
  }
};

module.exports = {
  login,
};
