// Ruta '/api/usuarios'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, createUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/users');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);


router.post('/', 
[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email válido es obligatorio').isEmail(),
    validarCampos,
],
createUsuarios
);

router.put('/:id',
[ 
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email válido es obligatorio').isEmail(),
    validarCampos
], 
actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);



module.exports = router;