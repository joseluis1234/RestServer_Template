const { Router } = require("express");
const router = Router();
const usuario = require("../controllers/user");

router.get("/", usuario.get);

router.put("/:id", usuario.put);

router.post("/", usuario.post);

router.delete("/", usuario.delete);

router.patch("/", usuario.patch);

module.exports = router;
