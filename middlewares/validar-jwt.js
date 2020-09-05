const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    // Comprobar si existe
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    // Validar el token
    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET);//si esta comprobación da error salta al catch

        console.log(uid);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }


    
    
}


module.exports = { validarJWT };