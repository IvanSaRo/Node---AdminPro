const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = (req, res, next) => {
  // Leer el token
  const token = req.header("x-token");

  // Comprobar si existe
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  // Validar el token
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET); //si esta comprobación da error salta al catch
    // { uid } lo hemos desestructurado para que separe el uid del objeto y no ver el momento de dar el token(iat) ni su momento de expiracion(exp)
    // {
    // "uid": "5f53a45f0eb73b46a8b01bbb",
    // "iat": 1599317087,
    // "exp": 1599360287
    // }

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token incorrecto",
    });
  }
};

const validateADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no válido",
      });
    }

    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "No dispones de los privilegios necesarios",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const validateADMIN_ROLE_or_SameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no válido",
      });
    }

    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No dispones de los privilegios necesarios",
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_SameUser,
};
