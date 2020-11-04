// Ruta '/api/usuarios'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')

const { getUsers, createUser, putUser, deleteUser } = require('../controllers/users');
const {validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_or_SameUser} = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, validateADMIN_ROLE, getUsers);


router.post('/', 
[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email válido es obligatorio').isEmail(),
    validateFields,
],
createUser
);

router.put('/:id',
[ 
    validateJWT,
    validateADMIN_ROLE_or_SameUser,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email válido es obligatorio').isEmail(),
    validateFields
], 
putUser);

router.delete('/:id', validateJWT, validateADMIN_ROLE, deleteUser);



module.exports = router;