const { Router } = require("express");
const router = Router();
const {check} = require('express-validator');

const usuario = require("../controllers/user");
const {validarCampos} = require('../middlewares/validacion_campos');
const {rolValido,emailExistente} = require('../helpers/db-validators');

router.get("/", usuario.get);

router.put("/:id", usuario.put);

router.post("/", [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener mas de 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExistente),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolValido),
    validarCampos
],usuario.post);

router.delete("/", usuario.delete);

router.patch("/", usuario.patch);

module.exports = router;
