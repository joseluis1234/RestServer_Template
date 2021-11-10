const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,  
      useUnifiedTopology: true, 
    //   useCreateIndex: true, 
    //   useFindAndModify: false,
    });
    console.log('Base de Datos Online')
  } catch (err) {
      console.log( err );
    throw new Error('Error al iniciar la BD');
  }
};


module.exports = {dbConnection}