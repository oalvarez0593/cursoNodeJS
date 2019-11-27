var express = require('express');
var CategoriaController = require('../controllers/categoria');
const md_auth = require('../middleware/authenticated');

var api = express.Router();

api.get('/cat', CategoriaController.home);
api.post('/categoria', md_auth.getToken, CategoriaController.createCategoria);
api.get('/categorias/:page?', md_auth.getToken, CategoriaController.getCategorias);
api.get('/categoria/:id', md_auth.getToken, CategoriaController.getCategoria);
api.put('/categoria/:id', md_auth.getToken, CategoriaController.updateCategoria);
api.delete('/categoria/:id', md_auth.getToken, CategoriaController.deleteCategoria);
module.exports = api;