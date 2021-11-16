const {request,response} = require('express')


const adminRole = (req = request,res = response,next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se requiere verificar el role sin validar el token primero'
        });
    }

    const {rol,nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`El usuario ${nombre} no tiene el rol de administrador`
        });
    }

    next();
}

const tieneRol = (...roles) => {
    return (req = request,res = response,next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se requiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere tener alguno de los siguientes roles ${roles}`
            });
        }

        next();
    }
}



module.exports = {
    adminRole,
    tieneRol
}