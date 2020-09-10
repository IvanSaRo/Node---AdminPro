const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

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
        
        const { uid }  = jwt.verify( token, process.env.JWT_SECRET);//si esta comprobación da error salta al catch
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
            msg: 'Token incorrecto'
        });
    }


    
    
}





module.exports = { validateJWT };