// api/search

const { Router } = require("express");
const { getGeneral, getFromTable } = require("../controllers/searchs");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:search", validateJWT, getGeneral);
router.get("/collection/:table/:search", validateJWT, getFromTable);

module.exports = router;
