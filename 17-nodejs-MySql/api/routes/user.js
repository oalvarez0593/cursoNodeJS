var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/home', UserController.home);
api.get('/pruebas', UserController.pruebas);
api.get('/allusers', UserController.getAllUsers);
api.get('/user/:id', UserController.getUser);
api.get('/pagination/:limit?/:offset?', UserController.paginationUsers);

module.exports = api;