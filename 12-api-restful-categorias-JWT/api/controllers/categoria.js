const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');
const Categoria = require('../models/categoria');
const jwt = require('../jwt/jwt');
var mongoose = require('mongoose');


function home(request, response) {
    response.status(200).send({
        message: 'Modulo de categorias'
    });
}

function createCategoria(request, response) {
    let categoriaParams = request.body;

    let categoria = new Categoria();
    if (categoriaParams.name && categoriaParams.id) {
        categoria.id = categoriaParams.id;
        categoria.name = categoriaParams.name;

        Categoria.find({
            $or: [
                { id: categoria.id }
            ]
        }).exec((err, categorias) => {
            if (err) return response.status(500).send({ message: 'Error en la petición de categorias' });
            if (categorias && categorias.length >= 1) {
                return response.status(200).send({ message: `La categoria con id: ${categoria.id} que intenta registrar ya existe` });
            } else {
                categoria.save((err, categoriaStored) => {
                    if (err) {
                        response.status(500).send({
                            status: 500,
                            message: 'Error en el servidor',
                            sucess: false
                        })
                    }
                    if (categoriaStored) {
                        response.status(200).send({
                            status: 200,
                            user: categoriaStored,
                        })
                    } else {
                        response.status(404).send({
                            status: 404,
                            message: `No se ha logrado ingresar la categoria ${categoria.name}`
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

function getCategorias(request, response) {
    let page = 1;
    let itemsPerPage = 5;

    if (request.params.page) {
        page = request.params.page;
    }

    Categoria.paginate({}, { page: page, limit: itemsPerPage, sort: '_id' }, (err, categorias) => {
        if (err) return response.status(500).send({
            status: 500,
            message: 'Error en el servidor'
        });

        if (categorias.docs.length === 0) return response.status(404).send({
            status: 404,
            message: 'No se han encontrado usuarios en la búsqueda'
        });

        let data = {
            categorias: categorias.docs,
            totalCategoriasStored: categorias.total,
            currentPage: categorias.page,
            totalPages: categorias.pages
        }
        response.status(200).send({
            status: 200,
            data: data
        });
    });
}

function getCategoria(request, response) {
    let id = request.params.id;

    Categoria.find({ id: id }).exec((err, categoria) => {
        if (err) return response.status(500).send({
            status: 500,
            message: 'Error en el servidor'
        });

        if (!categoria || categoria.length === 0) {
            return response.status(404).send({
                status: 404,
                message: `No se encontró ningún registro con el id: ${id}`
            });
        }

        response.status(200).send({
            status: 200,
            categoria: categoria
        })
    });
}

///////////////////////////////////////////////
// Para actualizar por _id que asiga MongoDB //
///////////////////////////////////////////////

/* function updateCategoria(request, response) {

	let categoria = new Categoria();
	let categoriaId = request.params.id;
	let params = request.body;


	Categoria.find({_id: categoriaId }).exec((err, cateogrias) => {
		let categoria_isset = false;
		cateogrias.forEach((categoria) => {
			if (categoria && categoria._id != categoriaId) {
				categoria_isset = true;
			}
		});

		if (categoria_isset) {
			return response.status(404).send({
				message: 'Los datos que quieres actualizar ya se encuentran en uso',
				status: 404
			});
		}

		Categoria.findByIdAndUpdate({_id: categoriaId}, params, { new: true }, (err, categoriaUpdated) => {
			if (err) {
				return response.status(500).send({
					status: 500,
					message: 'Ocurrio un error en el servidor',
                    er: err,
                    id: categoriaId
				});
			}
			if (!categoriaUpdated) {
				return response.status(404).send({
					status: 404,
					message: 'No se ha podido actualizar los datos de la categoria'
				});
			} else {
				return response.status(200).send({
					status: 200,
					categoria: categoriaUpdated
				});
			}
		});
	});
} */


//////////////////////////////////////////
// Para actualizar por id personalizado //
//////////////////////////////////////////

function updateCategoria(request, response) {

    let categoria = new Categoria();
    let categoriaId = request.params.id;
    let params = request.body;
    delete params.id;


    Categoria.find({ id: categoriaId }).exec((err, cateogrias) => {
        let categoria_isset = false;
        cateogrias.forEach((categoria) => {
            if (categoria && categoria.id != categoriaId) {
                categoria_isset = true;
            }
        });

        if (categoria_isset) {
            return response.status(404).send({
                message: 'Los datos que quieres actualizar ya se encuentran en uso',
                status: 404
            });
        }

        Categoria.findOneAndUpdate({ id: categoriaId }, params, { new: true }, (err, categoriaUpdated) => {
            if (err) {
                return response.status(500).send({
                    status: 500,
                    message: 'Ocurrio un error en el servidor',
                    er: err,
                    id: categoriaId
                });
            }
            if (!categoriaUpdated) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido actualizar los datos de la categoria'
                });
            } else {
                return response.status(200).send({
                    status: 200,
                    categoria: categoriaUpdated
                });
            }
        });
    });
}

function deleteCategoria(request, response) {
    let categoriaId = request.params.id;

    Categoria.find({ id: categoriaId }).exec((err, categoria) => {
        if (!categoria || categoria.length === 0) {
            return response.status(404).send({
                status: 404,
                message: `La categoria con id: ${categoriaId}, no existe en la base de datos`
            });
        } else {
            Categoria.findOneAndDelete({ id: categoriaId }, (err, categoriaDeleted) => {
                if (err) return response.status(500).send({
                    status: 500,
                    message: 'Error en el servidor'
                });

                return response.status(200).send({
                    status: 200,
                    message: `La categoria con el id: ${categoriaId} ha sido eliminado`,
                    categoriaDeleted: categoriaDeleted
                });
            });
        }
    });
}

module.exports = {
    home,
    createCategoria,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria
}