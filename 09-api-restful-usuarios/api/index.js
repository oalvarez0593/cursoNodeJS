var mongoose = require('mongoose');
var app = require('./app');

const portListen = process.env.PORT = process.env.PORT || 3000;

/* *****************************  	CONEXIÓN A LA BASE DATOS 	******************************** */

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("La conexión a la base de datos cafe se ha realizado correctamente");
    app.listen(portListen, () => {
        console.log(`Servidor corriendo en el puerto ${portListen}`);
    });
})
    .catch(err => console.log(err));