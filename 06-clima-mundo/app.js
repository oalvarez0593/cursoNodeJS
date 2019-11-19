const argv = require('./config/yargs').argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

// console.log(argv.direccion);
/* lugar.getLugarLatLong(argv.direccion).then(direccion => {
    //console.log(direccion);
}).catch(err => {
    console.log(err);
})

clima.getClima(argv.latitud, argv.longitud).then(clima => {
    console.log(clima);
}).catch(err => {
    console.log(err);
}) */

let getInfo = async (direccion) => {

    try {
        let coordenadas = await lugar.getLugarLatLong(direccion);
 //        console.log(coordenadas);
        let temperatura = await clima.getClima(coordenadas.latitud, coordenadas.longitud);
        return `El clima de ${coordenadas.direccion} es de ${temperatura}`;
    } catch (error) {
        return `No se pudo determinar el clima de: ${direccion}`;
    }

}

getInfo(argv.direccion).then(info => {
    console.log(info);
}).catch(err => {
    console.log(err);
});