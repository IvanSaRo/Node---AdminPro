// api/uploads

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());// NOs permite usar el .file en el controlador

router.put('/:table/:id',validateJWT, fileUpload);


module.exports = router;