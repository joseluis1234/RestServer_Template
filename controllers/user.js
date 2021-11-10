const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const usuario = {};

usuario.get = (req, res) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: "Get API - controlador",
    q,
    nombre,
    apikey,
  });
};

usuario.put = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Put API - controlador",
    id,
  });
};

usuario.post = async (req, res) => {

  const {nombre,correo,password,rol} = req.body;
  const usuarios = new Usuario({nombre,correo,password,rol});

  //Hacer el hash de la contraseña
  const salt = await bcrypt.genSalt(10);//10 es la cantidad de veces que se va a encriptar
  usuarios.password = bcrypt.hashSync(password, salt);
  
  //Guardar en DB
  await usuarios.save();
  res.json({
    usuario
  });
};

usuario.delete = (req, res) => {
  res.json({
    msg: "Delete API - controlador",
  });
};

usuario.patch = (req, res) => {
  res.json({
    msg: "Patch API - controlador",
  });
};

module.exports = usuario;
