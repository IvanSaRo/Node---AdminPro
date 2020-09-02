const Usuario = require('../models/user');

const getUsuarios = (req, res) => {

    res.json({
        ok: true, 
        msg: 'Get Usuarios'
    });
}

const createUsuarios = async (req, res) => {
    
    const { email, password, name } = req.body;

    const user = new Usuario( req.body );

    await user.save();
    
    res.json({
        ok: true, 
        user
    });
}


module.exports = {
    getUsuarios,
    createUsuarios
}