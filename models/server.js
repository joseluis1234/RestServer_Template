const express = require("express");
const cors = require("cors");
const {dbConnection}= require('../database/config')


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = '/api/usuarios'

    //Conexion a la BD
    this.conexionDB();
    //Middlewares
    this.middleware();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conexionDB(){
    await dbConnection();
  }

  middleware(){
      //Cors
      this.app.use(cors());

      //  Body Parser
      this.app.use(express.json());//Para que el servidor entienda los datos que llegan en formato json

      //Directorio publico
      this.app.use(express.static('public'));

  }

  routes() {
    this.app.use(this.usuarioPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
