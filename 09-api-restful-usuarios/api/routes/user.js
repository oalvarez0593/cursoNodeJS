var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/home', UserController.home);
api.get('/pruebas', UserController.pruebas);
api.post('/user', UserController.createUser);
api.put('/user/:id', UserController.updateUser);
module.exports = api;