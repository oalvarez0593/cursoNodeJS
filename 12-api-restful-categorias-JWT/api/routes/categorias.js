var express = require('express');
var CategoriaController = require('../controllers/categoria');
const md_auth = require('../middleware/authenticated');

var api = express.Router();

api.get('/cat', CategoriaController.home);
api.post('/categoria', md_auth.getToken, CategoriaController.createCategoria);
api.get('/categorias/:page?', md_auth.getToken, CategoriaController.getCategorias);
api.get('/categoria/:id', md_auth.getToken, CategoriaController.getCategoria);
api.get('/categoriaPopulate/:id', md_auth.getToken, CategoriaController.getCategoriaPopulate);
api.get('/categorias/buscar/:palabra?', md_auth.getToken, CategoriaController.getCategoriaConsultaMatch);
api.put('/categoria/:id', md_auth.getToken, CategoriaController.updateCategoria);
api.delete('/categoria/:id', md_auth.getToken, CategoriaController.deleteCategoria);
module.exports = api;