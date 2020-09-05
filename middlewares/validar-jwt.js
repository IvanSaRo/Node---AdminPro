

const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    console.log(token);

    
    
    next();
}


module.exports = { validarJWT };