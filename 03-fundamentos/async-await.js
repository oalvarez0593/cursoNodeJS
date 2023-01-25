let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Omar Alvarez');
        }, 3000);
    });
}

let getSaludo = async () => {
    let nombre =  await getNombre();
    return `Hola ${nombre}`;
}

getSaludo().then(mensaje => {
    console.log(mensaje);
});