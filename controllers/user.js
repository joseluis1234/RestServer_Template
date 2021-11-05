const { response } = require("express");

const usuario = {};

usuario.get = (req, res) => {
  const {q, nombre, apikey} = req.query;
  res.json({
    msg: "Get API - controlador",
    q,
    nombre,
    apikey
  });
};

usuario.put = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Put API - controlador",
    id
  });
};

usuario.post = (req, res) => {
  const {nombre, edad} = req.body;
  res.json({
    msg: "Post API - controlador",
    nombre,
    edad
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
