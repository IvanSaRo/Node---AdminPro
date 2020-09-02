const Usuario = require('../models/user');

const getUsuarios = async (req, res) => {

    const users = await Usuario.find({}, 'name email role google');
    
    res.json({
        ok: true, 
        users
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