
let socket = io();

/* ON es para escuchar información o escuchar sucesos */

socket.on('connect', () => {
    console.log('conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

/* EMIT es para enviar información */

socket.emit('enviar-mensaje', {
    usuario: 'Omar Alvarez',
    message: 'Hola a todos'
}, (resp) => {
    console.log(resp);
});

socket.on('sideServer', (data) => {
    console.log(data);
});

socket.on('enviar-mensaje', (data) => {
    console.log('Respuesta del server: ', data);
});