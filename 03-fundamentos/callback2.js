let empleados = [{
    id: 1,
    nombre: 'Omar Alvarez'
}, {
    id: 2,
    nombre: 'Daniel Valencia'
}, {
    id: 3,
    nombre: 'Gilberto Carvajal'
}, {
    id: 4,
    nombre: 'Rony Lizano'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}, {
    id: 3, 
    salario: 3000
}, {
    id: 4,
    salario: 4000
}];

let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === id;
    });

    if (!empleadoDB) {
        callback(`El empleado con id ${id}, no existe en la BD`);
    } else {
        callback(null, empleadoDB);
    }
}

getEmpleado(4, (err, empleado) => {
    if (err) {
        return console.log(err);
    }
        console.log(empleado);
});

let getSalario = (idEmpleado, callback) => {
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === idEmpleado;
    });

    if (!empleadoDB) {
        callback(`El empleado con id ${idEmpleado} no existe en la base de datos`);
    } else {
        let salarioEmpleado = salarios.find(salario => {
            return salario.id === empleadoDB.id;
        });

        if (!salarioEmpleado) {
            callback(`No se encontró un salario para el usuario ${empleadoDB.nombre.toUpperCase()}`);
        } else {
            callback(null, {
                nombre: empleadoDB.nombre,
                salario: salarioEmpleado.salario
            });
        }
    }
}

getSalario(1, (err, salario) => {
    if (err) {
       return  console.log(err);
    }
        console.log(`El salario de ${salario.nombre.toUpperCase()}, es de ${salario.salario}`);
});