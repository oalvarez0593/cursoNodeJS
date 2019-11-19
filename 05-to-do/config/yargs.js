const optionCrear = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

const optionEliminar = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

const optionUpdate = {
    descripcion: {
        demand: true,
        alias: 'd'
    },
    completado: {
        alias: 'c',
        default: true
    }
}

const argv = require('yargs')
    .command('crear', 'Genera una tarea por hacer', optionCrear)
    .command('actualizar', 'Actualiza la información de una tarea por hacerr', optionUpdate)
    .command('eliminar', 'Elimina una tarea por hacer', optionEliminar)
    .help()
    .argv;
module.exports = {
    argv
}