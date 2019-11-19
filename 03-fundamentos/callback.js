setTimeout( () => {
    console.log('Hola mundo');
}, 3000);

let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Omar Alvarez',
        id: id
    }

        if (id == 20) {
            callback(`El usuario con id: ${id}, no existe ne la BD`)
        } else {
            callback(null, usuario);
        }
    
}

getUsuarioById(10, (err, usuario) => {
    if (err) {
      return  console.log(err);
    } 
    console.log('Usuario de base de datos', usuario);
});