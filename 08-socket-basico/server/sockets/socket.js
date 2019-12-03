const {io} = require('../server');


/* ON es para escuchar información o escuchar sucesos */

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('El cliente ha perdido conexion con el servidor');
    });

    /* ESCUCHAR EL CLIENTE */

    client.on('enviar-mensaje', (data, callback) => {
        console.log(data);
       /*  if (data.usuario) {
            callback({
                resp: 'Todo salió BIEN'
            });
        } else {
            callback({
                resp: 'Todo salió MAL !!!!!!'
            });
        } */

        client.broadcast.emit('enviar-mensaje', {
            user: data.usuario,
            msj: data.message
        });
    });

    io.emit('sideServer', {
        usuario: 'Usuario1',
        message: `Hola Usuario1`
    })
});