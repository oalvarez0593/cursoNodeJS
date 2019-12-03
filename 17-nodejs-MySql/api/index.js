var app = require('./app');
var mysql = require('mysql');

const portListen = process.env.PORT = process.env.PORT || 3000;
const ambiente = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

/* *****************************  	CONEXIÓN A LA BASE DATOS 	******************************** */

    app.listen(portListen, () => {
        console.log(`Servidor corriendo en el puerto ${portListen}`);
    });

/* var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'omar115240110',
  database : 'node_db'
});
 
connection.connect();
 
connection.query('SELECT * from tblUsers', (error, results) => {
  if (error) throw error;
  console.log(results);
});

 
connection.end(); */