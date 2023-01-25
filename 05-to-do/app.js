const argv = require('./config/yargs').argv;
const toDo = require('./to-do/to-do');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = toDo.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let tareas = toDo.listarJSON();
        for (const tarea of tareas) {
            console.log('=========Por hacer========='.brightCyan);
            console.log(`Tarea: ${tarea.descripcion}`);
            console.log(`Estado: ${tarea.completado}`);
            console.log('==========================='.brightCyan);
        }

        break;

    case 'actualizar':
        let tareaUpdated = toDo.updateData(argv.descripcion, argv.completado);
        console.log(tareaUpdated);
        break;

    case 'eliminar':
        let eliminar = toDo.eliminarTarea(argv.descripcion);
        console.log(eliminar);
        break;

    default:
        console.log('Comando inválido');
        break;
}