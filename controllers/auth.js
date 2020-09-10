const { response } = require("express");

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const { createJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no válido",
      });
    }

    //Verificar password comparando el de body con el de BD
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // Generar el Token (JWT)
    const token = await createJWT( userDB.id );

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el adeministrador",
    });
  }
}

const googleSignIn = async( req, res = response) => {

  const googleToken = req.body.token;
  
  try {
    const {name, email, picture} = await googleVerify( googleToken );
    let user;

    const userDB = await User.findOne({ email }); 
    if( !userDB){
      //no existe el usuario
        user = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    }else{
      //existe el usuario
      user = userDB;
      user.google = true;
    }

    //guardamos en DB
    await user.save();

    //generamos JWT validado por nuestro back
    const token = await createJWT( user.id );

      
    
    res.json({
      ok: true,
      msg: 'Google SignIn',
      token
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token erróneo',
      
    })
  }
  
  
  
  
}

module.exports = {
  login,
  googleSignIn
};
