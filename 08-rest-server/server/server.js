const port = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', function (req, res) {
    res.status(200).send({
        user: {
            nombre: 'Omar',
            apellido: 'Alvarez'
        },
    });
})

app.post('/usuario', function (req, res) {
    let user = req.body;

    if (user.name === undefined || user.name === '' || user.name.length <= 0) {
        res.status(500).send({
            message: 'El campo nombre viene vacio',
            status: 500,
            sucess: false
        });
    } else {
        res.status(200).send({
            nombre: user.name,
            apellido: user.lastname
        });
    }
})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;

    res.status(200).send({
        nombre: 'Omar',
        apellido: 'Alvarez',
        id: id
    });
})

app.delete('/usuario', function (req, res) {
    res.status(200).send({
        nombre: 'Omar',
        apellido: 'Alvarez'
    });
})

app.listen(port.portListen, () => {
    console.log('Escuchando el puerto', port.portListen);
});