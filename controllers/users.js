const { response } = require("express"); // es un tipado por defecto para la res
const Usuario = require("../models/user");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const users = await Usuario.find({}, "name email role google");

  res.json({
    ok: true,
    users,
  });
};

const createUsuarios = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // comprobar si existe el email
    const emailExists = await Usuario.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Generar el Token (JWT)
    const token = await createJWT( user.id );

    //Guardar usuario
    await user.save();

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    //hemos de comprobar que el usuario existe
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    //TODO validar token google y comprobar si el usuario es el correcto

    //Actualizaciones
    const { password, google, email, ...campos } = req.body;
    //en vez de ocupar los deletes de abajo para quitar del objeto que voy a mandar en el put para que no sobreescriban esos campos en la BD saco email, lo trato y lo vuelvo a meter en el objeto mas abajo

    if (usuarioDB.email != email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese mail",
        });
      }
    }
    //estos deletes cumplen la funcion de borrar estas propiedades en el objeto que voy a mandar en el put para que no sobreescriban esos campos en la BD
    // delete campos.password;
    // delete campos.google;
    campos.email = email; // volvemos a meter el email ya tratado en el objeto

    const usarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario borrado"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el borrado",
    });
  }
};

module.exports = {
  getUsuarios,
  createUsuarios,
  actualizarUsuario,
  borrarUsuario,
};
