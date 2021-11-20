const { Router } = require("express");
const {check} = require('express-validator');

const {validaJWT,validarCampos,tieneRol,adminRole} = require('../middlewares');
const producto = require('../controllers/productos')

const {rolValido,emailExistente,idExistente,existeCategoria,existeProducto} = require('../helpers/db-validators');

const router = Router();

/**         
 * {{url}}/api/productos/
 * Crear un funcion que valide que existe la categoria
 */

//Obtener todos los productos, publico
router.get('/',producto.obtenerProductos);

//Obtener un producto por id - publico
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos    
],producto.obtenerProducto)

//Crear una producto, privado(Cualquier rol, y con un token valido)
router.post('/',[
    validaJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    validarCampos
],producto.agregarProducto);

//Actualizar una producto - privado - cualquiera con token valido
router.put('/:id',[
    validaJWT,
    check('id').custom(existeProducto),
    validarCampos
],producto.actualizarProducto);

//Borrar una producto - privado - solo si es Admin y con token valido
router.delete('/:id',[
    validaJWT,
    adminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],producto.borrarProducto)

module.exports = router;