const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const usuario = {};

usuario.get = async (req, res) => {

  const {limite = 5, desde=0} = req.query;
  const query = {estado:true};

  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])
  res.json({
    total,
    usuarios
  });
};

usuario.put = async (req, res) => {
  const {id} = req.params;
  const {_id, password, google,correo, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10); //10 es la cantidad de veces que se va a encriptar
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto,{new: true})

  res.json({
    usuarioDB,
  });
};

usuario.post = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuarios = new Usuario({ nombre, correo, password, rol });

  //Hacer el hash de la contraseña
  const salt = bcrypt.genSaltSync(10); //10 es la cantidad de veces que se va a encriptar
  usuarios.password = bcrypt.hashSync(password, salt);

  //Guardar en DB
  await usuarios.save();
  res.json(usuarios);
};

usuario.delete = async(req, res) => {
    const {id} = req.params;
   //Borrar Usuario Fisicamente
  //  const usuarioDel = await Usuario.findByIdAndDelete(id);
  const usuarioDel = await Usuario.findByIdAndUpdate(id,{estado:false});
   
  res.json(usuarioDel);
};


module.exports = usuario;