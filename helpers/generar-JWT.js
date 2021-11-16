const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') =>{

    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn: '5h'
        },(err,token)=>{
            if(err){
                console.log(object)
                reject('Error generando el token');
            }else{
                resolve(token);
            }
        })
    })
}


module.exports = {generarJWT}