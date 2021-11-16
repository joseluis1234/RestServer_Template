const { Router } = require("express");
const {check} = require('express-validator');

const auth = require ('../controllers/auth');
const {validarCampos} = require('../middlewares/validacion_campos');

const router = Router();

router.post("/login",[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],auth.login);




module.exports = router;