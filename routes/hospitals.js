// /api/hospitals

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getHospitals,
  createHospital,
  putHospital,
  deleteHospital,
} = require("../controllers/hospitals");

const router = Router();

router.get("/", validateJWT, getHospitals);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del hospital es necesario").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del hospital es necesario").not().isEmpty(),
    validateFields,
  ],
  putHospital
);

router.delete("/:id", validateJWT, deleteHospital);

module.exports = router;
