const argv = require('./config/yargs').argv;
const multiplicar = require('./multiplicar/multiplicar');
// let base = 7;

/* console.log('Base ', argv.base);
console.log('Limite ', argv.limite); */

let base = argv.base;
let limite = argv.limite;
let comando = argv._[0];

switch (comando) {
    case 'crear':
        multiplicar.crearArchivo(base, limite).then(archivo => {
            if (!archivo) {
                console.log('No se guardó la tabla')
            } else {
                console.log(archivo);
            }
        }).catch(err => {
            console.log(err);
        });
        break;

    case 'listar':
        multiplicar.leerTabla(base, limite).then(tabla => {
            if(!tabla) {
                console.log(`La tabla table-${base}.txt, no existe`);
            } else {
                console.log(tabla);
            }
        })
        .catch(err => {
            console.log(err);
        })
        break;

    default:
    console.log(`Comando introducido: ${comando.toUpperCase()}, no es válido`);
        break;
}