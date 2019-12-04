
const mysql = require('mysql');
const config = require('../mysql/config');

const connection = mysql.createConnection(config);


connection.connect((err) => {
	console.log(connection.threadId);
});
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
	let sql = `CALL getAllUsers()`;
	connection.query(sql, true, (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).send({
				message: error
			});
		}
		return response.status(200).send({
			results
		});
	});
}


function paginationUsers(request, response) {
	let params = request.params.limit;
	// let offset = request.params.offser;
	let separarParams = params.split('&');
	let limites = separarParams[0].split('=');
	let hasta = separarParams[1].split('=');
	let limit = limites[1];
	let offset = hasta[1];

	console.log(limit);
	console.log(offset); 
	let sql = `CALL pagination(${limit},${offset})`;
	connection.query(sql, true, (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).send({
				message: error
			});
		}
		if(!results) {
			return response.status(404).send({
				status: 404,
				message: 'No se encontraron usuarios entre esos rangos'
			});
		}
		return response.status(200).send({
			results
		});
	});
}

function getUser(request, response) {
	let id = request.params.id;
	let sql = `CALL getUser(${id})`;

	connection.query(sql, (error, user) => {
		if (error) {
			return response.status(500).send({
				message: error
			});
		}
		if(user[0].length <= 0) {
			return response.status(404).send({
				status: 404,
				message: `El usuario con el id: ${id}, no se encontró en la base datos`
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
	getUser,
	paginationUsers
}