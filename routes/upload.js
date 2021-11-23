const { Router } = require("express");
const {check} = require('express-validator');

const {validarCampos,validarArchivo} = require('../middlewares');
const upload = require('../controllers/upload');
const {coleccionesPermitidas} = require('../helpers')

const router = Router();

//Subirda de archivos
router.post('/',validarArchivo ,upload.cargar);

//Actualizar imagen del perfil
router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No es un id de Mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],upload.actualizarImagenCloudinary);
// ],upload.actualizarImagen);

//Obteer imagen del perfil
router.get('/:coleccion/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
],upload.mostrarImagen);

module.exports = router;