const validaCampos = require('../middlewares/validacion_campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar_roles');



module.exports =  {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles

}


