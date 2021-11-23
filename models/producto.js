const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: [true, "El estado es necesario"],
  },
  usuario: {
    type: Schema.Types.ObjectId, //referencia a otro objeto
    ref: "Usuario", //referencia a la coleccion
    required: [true, "El usuario es necesario"],
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId, //referencia a otro objeto
    ref: "Categoria", //referencia a la coleccion
    required: [true, "La categoria es necesaria"],
  },
  descripcion: {
    type: String
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img:{
    type:String
  }
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);
