const fs = require('fs');

let crearArchivo = (base, limite) => {
    return new Promise((reject, resolve) => {
        let table = '';

        if (!Number(base)) {
            reject(`El parámetro ingresado: ${base} no es un número`);
        } else {
            for (let i = 1; i <= limite; i++) {
                table += `${base} * ${i} = ${base * i} \n`;
            }
            // Escribir datos en un archivo.
            fs.writeFile(`./tablas/table-${base}.txt`, table, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`table-${base}.txt`)
                    console.log('El archivo ha sido creado');
                }

            });

            // Leer datos de un archivo.
            fs.readFile(`./tablas/table-${base}.txt`, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

            // Crear directorios.
            fs.mkdir('./tablas/example', { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
            });
        }
    });
}

let leerTabla = (base, limite) => {
    return new Promise((reject, resolve) => {

        let listaTabla = '';
        if (!Number(base)) {
            return reject(`El parámetro ${base}, no es un número`);
        }

        for (let i = 1; i <= limite; i++) {
            listaTabla += `${base}* ${i} = ${base * i} \n`;
        }
        resolve(listaTabla);
    },
        err => {
            if (err) {
                reject(err);
            }
        });
}
module.exports = {
    crearArchivo,
    leerTabla
}