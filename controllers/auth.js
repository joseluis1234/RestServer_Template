const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");

const auth = {};

auth.login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //Verifica si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo / Password son incorrectos - correo",
      });
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo / Password son incorrectos - estado:false",
      });
    }
    //Verifica si el password es correcto
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo / Password son incorrectos - password",
      });
    }

    //Genera el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

auth.google = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    //Refencia al correo
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //Crea el usuario
      const data = {
        nombre,
        correo,
        password: ":)",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Hable con el admin - usuario bloqueado",
      });
    }
    
    //Genera el JWT
    const token = await generarJWT(usuario.id);
    

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = auth;
