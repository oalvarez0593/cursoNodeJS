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
}, {
    id: 5,
    nombre: 'Mariun Soto'
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

let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => {
            return empleado.id === id;
        });

        if (!empleadoDB) {
            reject(`El empleado con id ${id}, no existe en la BD`);
        } else {
            resolve(empleadoDB);
        }
    });
}

let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => {
            return salario.id === empleado.id;
        });
        if (!salarioDB) {
            reject(`El empleado  ${empleado.nombre}, no tiene salario asociado`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario
            });
        }
    });
}

getEmpleado(1).then(empleado => {
    console.log('Empleado de la BD', empleado);
    return getSalario(empleado);
}).then (salario => {
    console.log(`El salario de ${salario.nombre}, es de ${salario.salario}$`);
}).catch(err => {
    console.log(err);
});

