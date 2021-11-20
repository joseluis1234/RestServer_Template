const{Schema,model} = require('mongoose');

const CategoriaSchema =  Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:[true,'El estado es necesario']
    },
    usuario:{
        type:Schema.Types.ObjectId,//referencia a otro objeto
        ref:'Usuario',//referencia a la coleccion
        required:[true,'El usuario es necesario']
    }

});

CategoriaSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports = model('Categoria',CategoriaSchema);