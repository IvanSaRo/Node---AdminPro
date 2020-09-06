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
} = require("../controllers/doctors");

const router = Router();

router.get("/", getDoctors);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check('hospital', 'El id del hospital ha de ser válido').isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put("/:id", [], putDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;