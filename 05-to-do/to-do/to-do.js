const fs = require('fs');

let listadoToDo = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);
    // Escribir datos en un archivo.
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) {
            throw new Error(err);
        } else {
            console.log(`El archivo ha sido escrito`);
        }
    });
}

const cargarDB = () => {
    try {
        listadoToDo = require('../db/data.json');
    } catch (error) {
        listadoToDo = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    const toDo = {
        descripcion: descripcion,
        completado: false
    };
    listadoToDo.push(toDo);
    guardarDB();

    return toDo;
};

const listarJSON = () => {
    cargarDB();
    return listadoToDo;
}

const updateData = (descripcion, completado) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const eliminarTarea = (descripcion) => {
    cargarDB();

    let tareaEliminada = listadoToDo.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoToDo.length === tareaEliminada.length) {
        return false;
    } else {
        listadoToDo = tareaEliminada;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    listarJSON,
    updateData,
    eliminarTarea
}