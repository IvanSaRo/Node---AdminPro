// /api/hospitals

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getDoctors,
  createDoctor,
  putDoctor,
  deleteDoctor,
  getDoctorById,
} = require("../controllers/doctors");

const router = Router();

router.get("/", validateJWT, getDoctors);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El id del hospital ha de ser válido").isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del doctor es necesario").not().isEmpty(),
    check("hospital", "El id del doctor ha de ser válido").isMongoId(),
    validateFields,
  ],
  putDoctor
);

router.delete("/:id", validateJWT, deleteDoctor);

router.get("/:id", validateJWT, getDoctorById);

module.exports = router;
