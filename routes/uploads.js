// api/uploads

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:table/:id',validateJWT, fileUpload);


module.exports = router;