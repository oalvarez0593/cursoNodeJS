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

let getEmpleado = async (id) => {
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === id;
    });

    if (!empleadoDB) {
        throw new Error(`El empleado con id ${id}, no existe en la BD`);
    } else {
        return empleadoDB;
    }
}

let getSalario = async (empleado) => {
    let salarioDB = salarios.find(salario => {
        return salario.id === empleado.id;
    });
    if (!salarioDB) {
        throw new Error(`El empleado  ${empleado.nombre}, no tiene salario asociado`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        };
    }
}



let getInformacion = async (idEmpleado) => {
    let empleado = await getEmpleado(idEmpleado);
    let salario = await getSalario(empleado);
    return `El empleado ${salario.nombre.toUpperCase()}, tiene un salario de: ${salario.salario}$`;
}

getInformacion(1).then(mensaje => {
    console.log(mensaje);
}).catch(err => {
    console.log(err);
})