const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');
var fs = require('fs');
var path = require('path');
const User = require('../models/user');
const jwt = require('../jwt/jwt');

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

function loginUser(request, response) {
	let params = request.body;

	User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
		if (err) return response.status(500).send({
			status: 500,
			message: 'error en el servidor'
		});

		if (!user) return response.status(404).send({
			status: 404,
			message: 'Usuario incorrecto'
		})

		if (!bcrypt.compareSync(params.password, user.password)) {
			return response.status(404).send({
				status: 404,
				message: 'Password incorrecto'
			});
		}

		user.password = undefined;
		return response.status(200).send({
			status: 200,
			user: user,
			token: jwt.createToken(user)
		})
	});
}

function uploadImage(request, response) {
	var userId = request.params.id;


	if (request.files) {
		var file_path = request.files.img.path;
		/* console.log(file_path); */
		var file_split = file_path.split('\\');
		/* console.log(file_split); */
		var file_name = file_split[2];
		/* console.log(file_name); */
		var ext_split = file_name.split('\.');
		/* console.log(ext_split); */
		var file_ext = ext_split[1];
		/* console.log(file_ext); */

		if (userId != request.user.id) {

			return removeFilesOfUploads(response, file_path, 'No tienes permisos para actualizar los datos del usuario');
		}

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
			User.findByIdAndUpdate(userId, { img: file_name }, { new: true }, (err, userUpdated) => {
				if (err) return response.status(500).send({ message: 'Error en la petición' });
				if (!userUpdated) return response.status(404).send({ message: 'No se ha podido actualizar la imagen' });

				return response.status(200).send({ user: userUpdated });
			});
		} else {
			return removeFilesOfUploads(response, file_path, 'Extensión no válida');
		}
	} else {
		return response.status(200).send({ message: 'No se han subido imágenes.' });
	}
}

function removeFilesOfUploads(response, file_path, message) {

	fs.unlink(file_path, (err) => {
		if (err) return response.status(200).send({ message: message });

		return response.status(200).send({
			message: message
		});
	});
}

function getImageFile(request, response) {
	var image_file = request.params.imageFile;
	var path_file = './upload/users/' + image_file;

	fs.exists(path_file, (exists) => {
		if (exists) {
			return response.sendFile(path.resolve(path_file));
		} else {
			return response.status(200).send({ message: 'No existe la imagen' });
		}
	});

}

module.exports = {
	home,
	pruebas,
	createUser,
	updateUser,
	getUsers,
	deleteUser,
	loginUser,
	uploadImage,
	getImageFile
}