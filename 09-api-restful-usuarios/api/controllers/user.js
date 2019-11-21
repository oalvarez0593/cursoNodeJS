const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');
const User = require('../models/user');

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

function createUser(request, response) {
	let userParams = request.body;

	let user = new User();
	if (userParams.name && userParams.email && userParams.password) {
		user.name = userParams.name;
		user.email = userParams.email;
		user.role = 'USER_ROLE';
		user.img = null;
		user.status = null;
		user.google = null;

		User.find({
			$or: [
				{ email: user.email.toLowerCase() }
			]
		}).exec((err, users) => {
			if (err) return response.status(500).send({ message: 'Error en la petición de usuarios' });
			if (users && users.length >= 1) {
				return response.status(200).send({ message: `El usuario con email: ${user.email} que intenta registrar ya existe` });
			} else {
				let salt = bcrypt.genSaltSync(10, userParams.password);
				let hash = bcrypt.hashSync(userParams.password, salt);
				user.password = hash;
				user.save((err, userStored) => {
					if (err) {
						response.status(500).send({
							status: 500,
							message: 'Error en el servidor',
							sucess: false
						})
					}
					if (userStored) {
						user.password = undefined;
						response.status(200).send({
							status: 200,
							user: userStored,
						})
					} else {
						response.status(404).send({
							status: 404,
							message: `No se ha logrado ingresar el usuario ${user.name}`
						})
					}
				});
			}
		})

	} else {
		response.status(200).send({
			message: 'Rellena todos los campos necesarios'
		});
	}
}

function updateUser(request, response) {

	let user = new User();
	let userId = request.params.id;
	let params = request.body;
	delete params.password;
	delete params.google;


	User.find({
		$or: [
			{ email: params.email.toLowerCase() }
		]
	}).exec((err, users) => {
		let user_isset = false;
		users.forEach((user) => {
			if (user && user._id != userId) {
				user_isset = true;
			}
		});

		if (user_isset) {
			return response.status(404).send({
				message: 'Los datos que quieres actualizar ya se encuentran en uso',
				status: 404
			});
		}

		User.findByIdAndUpdate(userId, params, { new: true }, (err, userUpdated) => {
			if (err) {
				return response.status(500).send({
					status: 500,
					message: 'Ocurrio un error en el servidor',
					er: err
				});
			}
			if (!userUpdated) {
				return response.status(404).send({
					status: 404,
					message: 'No se ha podido actualizar los datos del usuario'
				});
			} else {
				userUpdated.password = undefined;
				return response.status(200).send({
					status: 200,
					user: userUpdated
				});
			}
		});
	});


}

function getUsers(request, response) {
	let page = 1;
	let itemsPerPage = 5;

	if (request.params.page) {
		page = request.params.page;
	}

	User.paginate({}, { page: page, limit: itemsPerPage, select: '-password', sort: '_id' }, (err, users) => {
		if (err) return response.status(500).send({
			status: 500,
			message: 'Error en el servidor'
		});

		if (users.docs.length === 0) return response.status(404).send({
			status: 404,
			message: 'No se han encontrado usuarios en la búsqueda'
		});

		let data = {
			users: users.docs,
			totalUsersStored: users.total,
			currentPage: users.page,
			totalPages: users.pages
		}
		response.status(200).send({
			status: 200,
			data: data
		});
	});
}

function deleteUser(request, response) {
	let userId = request.params.id;

	User.find({
		$or: [
			{ _id: userId }
		]
	}).exec((err, user) => {
		if (!user || user.length === 0) {
			return response.status(404).send({
				status: 404,
				message: `El usuario con id: ${userId}, no existe en la base de datos`
			});
		} else {
			User.findOneAndDelete({ _id: userId }, (err, userDeleted) => {
				if (err) return response.status(500).send({
					status: 500,
					message: 'Error en el servidor'
				});

				return response.status(200).send({
					status: 200,
					message: `El usuairo con el id: ${userId} ha sido eliminado`,
					userDeleted: userDeleted
				});
			});
		}
	});
}

module.exports = {
	home,
	pruebas,
	createUser,
	updateUser,
	getUsers,
	deleteUser
}