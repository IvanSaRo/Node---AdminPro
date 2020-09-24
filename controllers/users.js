const { response } = require("express"); // es un tipado por defecto para la res
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0; //paginación

  const [users, total] = await Promise.all([
    User.find({}, "name email role google img").skip(from).limit(5),

    User.countDocuments(),
  ]);
  // En vez de ejecutar las 2 órdenes async de abajo, que cargue una y luego la otra las metemos en Promise.All() ya que va 
  // a ser mas eficiente porque en vez de ejecutar ambas de manera secuencial lo harán de forma simultánea
  /* const users = await Usuario
                      .find({}, "name email role google")
                      .skip( from )
                      .limit( 5 );

 
                      const total = await Usuario.countDocuments(); */

  res.json({
    ok: true,
    users,
    total,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // comprobar si existe el email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Generar el Token (JWT)
    const token = await createJWT(user.id);

    //Guardar usuario
    await user.save();

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, revisar logs",
    });
  }
};

const putUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    //hemos de comprobar que el usuario existe
    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    //TODO validar token google y comprobar si el usuario es el correcto

    //Actualizaciones
    const { password, google, email, ...campos } = req.body;
    //en vez de ocupar los deletes de abajo para quitar del objeto que voy a mandar en el put para que no    
    //sobreescriban esos campos en la BD saco email, lo trato y lo vuelvo a meter en el objeto mas abajo

    if (usuarioDB.email != email) {
      const existeEmail = await User.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese mail",
        });
      }
    }
    //estos deletes cumplen la funcion de borrar estas propiedades en el objeto que voy a mandar en el put para que 
    //no sobreescriban esos campos en la BD
    // delete campos.password;
    // delete campos.google;
    if (!usuarioDB.google) {
      // comprobamos que no sea un user con google y si lo es no actualizamos el email
      campos.email = email; // volvemos a meter el email ya tratado en el objeto
    }
    

    const usarioActualizado = await User.findByIdAndUpdate(uid, campos, {
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

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario borrado",
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
  getUsers,
  createUser,
  putUser,
  deleteUser,
};
