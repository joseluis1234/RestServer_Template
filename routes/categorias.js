const { Router } = require("express");
const {check} = require('express-validator');

const {validaJWT,validarCampos,tieneRol,adminRole} = require('../middlewares');
const categoria = require('../controllers/categorias')

const {rolValido,emailExistente,idExistente,existeCategoria} = require('../helpers/db-validators');

const router = Router();

/**         
 * {{url}}/api/categoria/
 * Crear un funcion que valide que existe la categoria
 */

//Obtener todas las categorias, publico
router.get('/',categoria.obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], categoria.obtenerCategoria);

//Crear una categoria, privado(Cualquier rol, y con un token valido)
router.post('/', [
    validaJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoria.agregarCategoria);

//Actualizar una categoria - privado - cualquiera con token valido
router.put('/:id',[
    validaJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],categoria.actualizarCategoria);

//Borrar una categoria - privado - solo si es Admin y con token valido
router.delete('/:id',[
    validaJWT,
    adminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],categoria.borrarCategoria);

module.exports = router;