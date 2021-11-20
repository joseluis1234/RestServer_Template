const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Producto, Usuario, Categoria } = require("../models");

const buscador = {};

const coleccionesPermitidas = ["categorias", "productos", "usuarios", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const usuario = await Usuario.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //La i indica que es insensible a mayusculas y minusculas

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: usuarios,
  });
};

const buscarCategoria = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const categoria = await Categoria.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //La i indica que es insensible a mayusculas y minusculas

  const categorias = await Categoria.find({ nombre: regex, estado: true })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const producto = await Producto.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //La i indica que es insensible a mayusculas y minusculas

  const productos = await Producto.find({ nombre: regex, estado: true })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: productos,
  });
};

buscador.buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Se me olvido hacer esta busqueda",
      });
  }
};

module.exports = buscador;
