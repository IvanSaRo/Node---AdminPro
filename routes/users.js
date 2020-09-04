// Ruta '/api/usuarios'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, createUsuarios, actualizarUsuario } = require('../controllers/users')

const router = Router();

router.get('/', getUsuarios);


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
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email válido es obligatorio').isEmail(),
], 
actualizarUsuario);



module.exports = router;