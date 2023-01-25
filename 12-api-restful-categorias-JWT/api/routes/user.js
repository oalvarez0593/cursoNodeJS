var express = require('express');
var UserController = require('../controllers/user');
const md_auth = require('../middleware/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './upload/users'})

var api = express.Router();

api.get('/home', UserController.home);
api.get('/pruebas', UserController.pruebas);
api.post('/user', md_auth.getToken, UserController.createUser);
api.put('/user/:id', md_auth.getToken, UserController.updateUser);
api.get('/users/:page?', md_auth.getToken, UserController.getUsers);
api.delete('/user/:id', md_auth.getToken, UserController.deleteUser);
api.post('/login', UserController.loginUser);
api.post('/upload/:id', [md_auth.getToken, md_upload], UserController.uploadImage);
api.get('/get-image/:imageFile', [md_auth.getToken], UserController.getImageFile);
module.exports = api;