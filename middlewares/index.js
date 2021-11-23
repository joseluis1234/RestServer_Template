const validaCampos = require('../middlewares/validacion_campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar_roles');
const validarArchivo = require('../middlewares/validar_archivo');



module.exports =  {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo

}


