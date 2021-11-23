const {Usuario,Role,Categoria,Producto} = require("../models");

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

//Verifica que sea un id valido
const idExistente = async (id = "") => {
  const existeId = await Usuario.findById( id );
  if (!existeId) {
    throw new Error(`El id "${id}" no existe`);
  }
};

//Verifica que el id pertenezca a alguna categoria
const existeCategoria = async (id ='') =>{
  const existeIdCat = await Categoria.findById( id );
  if(!existeIdCat){
    throw new Error(`El ${id} no tiene una categoria asociada`);
  }
}

//Verificar que el id pertenezca a algun producto
const existeProducto = async (id ='') =>{
  const existeIdPro = await Producto.findById( id );
  if(!existeIdPro){
    throw new Error(`El ${id} no tiene un producto asociado`);
  }
}

//Validar las colecciones permitidas
const coleccionesPermitidas = async (coleccion = "",colecciones=[]) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La coleccion ${coleccion} no esta permitida`);
  }
  return true;
}

module.exports = { rolValido, emailExistente, idExistente, existeCategoria, existeProducto, coleccionesPermitidas };