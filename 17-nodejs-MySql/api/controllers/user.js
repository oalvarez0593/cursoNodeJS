
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'omar115240110',
	database: 'node_db'
});

connection.connect();

function home(request, response) {
	response.status(200).send({
		message: 'Hola Mundo desde el servidor de NodeJS'
	});
}

function pruebas(request, response) {
	console.log(request.body);
	response.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

function getAllUsers(request, response) {

	connection.query('SELECT * from tblUsers', (error, results) => {
		if (error) {
			return response.status(500).send({
				message: error
			});
		}
		return response.status(200).send({
			results
		});
	});
	/* connection.end(); */

}

function getUser(request, response) {

	let id= request.params.id;
console.log(id);
	connection.query('SELECT * from tblUsers where id =' + id , (error, user) => {
		if (error) {
			return response.status(500).send({
				message: error
			});
		}
		return response.status(200).send({
			user
		});
	});
	

}



module.exports = {
	home,
	pruebas,
	getAllUsers,
	getUser
}