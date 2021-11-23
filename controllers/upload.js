const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require("../models");

const upload = {};

upload.cargar = async (req, res = response) => {

  try {
    // const nombre = await subirArchivo(req.files,['txt','md'],'textos');
    const nombre = await subirArchivo(req.files, undefined, "img");
    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

upload.actualizarImagen = async (req, res = response) => {
  
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el usuario" });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el producto" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar eso" });
  }

  //Limpiar imagenes previas
  if(modelo.img){
    const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen);
    }

  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json(modelo);
};

upload.actualizarImagenCloudinary = async (req, res = response) => {
  
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el usuario" });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el producto" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar eso" });
  }

  //Limpiar imagenes previas
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
  }
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;
  await modelo.save();

  res.json(modelo);
};

upload.mostrarImagen = async(req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el usuario" });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: "No existe el producto" });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvido validar eso" });
  }

  //Limpiar imagenes previas
  if(modelo.img){
    const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img);
    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen);
    }
  }

  //Si el producto o usuario no tiene imagen
  if(!modelo.img){
    const pathNoExistImagen = path.join(__dirname,'../assets','no-image.jpg');
    return res.sendFile(pathNoExistImagen);
  }
};


module.exports = upload;