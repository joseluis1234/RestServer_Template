const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {dbConnection}= require('../database/config');



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.Path = {
      auth:       "/api/auth",
      buscar:     "/api/buscar",
      categorias: "/api/categoria",
      productos:  "/api/producto",
      usuario:    "/api/usuario",
      uploads:    "/api/uploads"
    }
    
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

      //Carga de archivos
      this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath : true
    }));

  }

  routes() {
    this.app.use(this.Path.auth, require('../routes/auth'));
    this.app.use(this.Path.usuario, require('../routes/user'));
    this.app.use(this.Path.categorias, require('../routes/categorias'));
    this.app.use(this.Path.productos, require('../routes/productos'));
    this.app.use(this.Path.buscar, require('../routes/buscar'));
    this.app.use(this.Path.uploads, require('../routes/upload'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
