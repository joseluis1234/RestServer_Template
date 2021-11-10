const Role = require("../models/role");
const Usuario = require("../models/usuario");

//Verifica que el rol exista en la BD
const rolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

//Verifica que existe el correo
const emailExistente = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya esta registrado en la BD`);
  }
};


module.exports = { rolValido, emailExistente };