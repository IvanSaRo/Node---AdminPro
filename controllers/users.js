const { response } = require('express');// es un tipado por defecto para la res 
const { validationResult } = require('express-validator');
const Usuario = require('../models/user');

const getUsuarios = async (req, res) => {

    const users = await Usuario.find({}, 'name email role google');
    
    res.json({
        ok: true, 
        users
    });
}

const createUsuarios = async (req, res = response) => {
    
    const { email, password, name } = req.body;

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    try {
        // comprobar si existe el email
        const emailExists =  await Usuario.findOne({ email });
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        
        const user = new Usuario( req.body );
        await user.save();
        
        res.json({
            ok: true, 
            user
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, revisar logs'
        })
    }
    
    
    

    
    
}


module.exports = {
    getUsuarios,
    createUsuarios
}