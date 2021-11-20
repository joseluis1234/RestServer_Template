const jwt = require('jsonwebtoken');
const {response,request} = require('express');
const Usuario = require("../models/usuario");


const validaJWT = async(req = request,res = response,next)=>{
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        }); 
    }

    try{
        const {uid} = jwt.verify(token,process.env.SECRETKEY);
        
        //Lee en usuario que corresponde en el uid
        const usuario =  await Usuario.findById(uid);

        if(!usuario){
            return res.status(404).json({
                msg:'El usuario no existe'
            });
        }
 
        //Verifica si el uid no tiene un estado false
        if(!usuario.estado){
            return res.status(401).json({
                msg:'El usuario no esta activo - usuario con estado false'
            });
        }   
        
        req.usuario = usuario;
        next();
    }
    catch(error){
        res.status(401).json({
            msg:'Token no valido'
        });
    }
}



module.exports = {
    validaJWT
}