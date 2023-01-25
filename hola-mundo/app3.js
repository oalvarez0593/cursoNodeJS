console.log('Inicio del programa');

setTimeout( () => {
    console.log('Primer timeOut');
}, 3000);

setTimeout( () => {
    console.log('Segundo timeOut');
}, 0);

setTimeout( () => {
    console.log('Tercer timeOut');
}, 0);

console.log('Fin del programa');