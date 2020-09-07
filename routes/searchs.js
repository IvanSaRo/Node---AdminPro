// api/general/:search

const { Router } = require('express');
const { getGeneral} = require('../controllers/searchs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:searchs',validateJWT, getGeneral);

module.exports = router;