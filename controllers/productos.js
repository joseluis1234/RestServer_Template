const { request, response } = require("express");

const { Producto } = require("../models");

const producto = {};

//obtenerProductos - paginado - total - populate(relacion con el usuario, poner el nombre del usuario)
producto.obtenerProductos = async (req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = {estado:true};

  const [total,productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario','nombre')
        .populate('categoria','nombre')
  ]);

  res.json({
    total,
    productos
  })

}

//obtenerProducto - populate {objeto de la categoria en base al id que le pase}
producto.obtenerProducto = async (req = request, res = response) => {
  const id = req.params.id;
  const productoDB = await Producto.findById(id).populate('usuario','nombre')
  .populate('categoria','nombre');

  res.json(productoDB);

}

//Creacion de una producto
producto.agregarProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;
  try {
    const productoDB = await Producto.findOne({ nombre:body.nombre });

    if (productoDB) {
        res.status(400).json({
            msg:`La Producto ${productoDB.nombre} ya existe`,
        })
    }

    //Generando la data
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    
    const productos = new Producto(data);
    await productos.save();
    res.status(201).json(productos);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error",
    });
  }
};

//Actualizar producto, solo recibe el nombre
producto.actualizarProducto = async (req = request, res = response) => {
  const {id} = req.params;
  const {estado,usuario,...data} = req.body;

  if(data.nombre){
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const productoDB = await Producto.findByIdAndUpdate(id, data, {new:true});

  res.json({
    productoDB
  })
}

//Borrar producto
producto.borrarProducto = async (req = request, res = response) => {
  const {id} = req.params;

  const borrarProducto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

  res.json(borrarProducto);
}

module.exports = producto;