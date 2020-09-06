// /api/hospitals



const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const {validateJWT} = require('../middlewares/validate-jwt');
const { getHospitals, createHospital, putHospital, deleteHospital } = require('../controllers/hospitals');


const router = Router();

router.get('/', getHospitals);


router.post('/', 
[ 
    
],
createHospital
);

router.put('/:id',
[ 
  
], 
putHospital);

router.delete('/:id', deleteHospital);



module.exports = router;