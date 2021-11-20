const {Router} = require('express');
const buscador = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:termino', buscador.buscar);



module.exports= router;