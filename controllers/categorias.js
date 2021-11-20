const { response, request } = require("express");

const { Categoria } = require("../models");

const categoria = {};

//obtenerCategorias - paginado - total - populate(relacion con el usuario, poner el nombre del usuario)
categoria.obtenerCategorias = async (req = request, res = response) => {
    const {limite=5, desde = 0} = req.query;
    const query = {estado:true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario','nombre correo')
    ])

    res.json({
        total,
        categorias
    });
}

//obtenerCategoria - populate {objeto de la categoria en base al id que le pase}
categoria.obtenerCategoria = async (req = request, res = response)=>{
  const id = req.params.id;
  const categorias = await Categoria.findById(id).populate('usuario','nombre correo');

  res.json({
      categorias
  });
}

//Creacion de una categoria
categoria.agregarCategoria = async (req=request ,res = response ) => {
  const nombre = req.body.nombre.toUpperCase();
  try {
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
      return res.status(400).json({
        msg: `La Categoria ${categoriaDB.nombre} ya existe`,
      });
    }

    //Generar la data a guardar
    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categorias = new Categoria(data);

    await categorias.save();
    res.status(201).json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error",
    });
  }
};

//Actualizar categoria, solo recibe el nombre
categoria.actualizarCategoria = async (req=request ,res = response) =>{
  const {id} = req.params;
  const {estado,usuario,...data} = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoriaDB = await Categoria.findByIdAndUpdate(id, data, {new:true});

  res.json({
    categoriaDB
  })
}

//borrar categoria
categoria.borrarCategoria = async (req=request ,res = response) =>{
  const {id} = req.params;

  const borrarCategoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

  res.json(borrarCategoria);
}

module.exports = categoria;