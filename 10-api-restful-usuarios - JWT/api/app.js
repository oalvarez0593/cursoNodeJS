var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/* *****************************  	CARGAR RUTAS 	******************************** */

var user_routes = require('./routes/user');

/* *****************************  	CARGAR MIDDLEWARES 	******************************** */

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* *****************************  	 CORS 	******************************** */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

/* *****************************  	 RUTAS 	******************************** */

app.use('/api',user_routes);

/* *****************************  	EXPORTAR 	******************************** */

module.exports = app;