// api/uploads

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, returnImg } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());// NOs permite usar el .file en el controlador

router.put('/:table/:id',validateJWT, fileUpload);
router.get('/:table/:img', returnImg);


module.exports = router;