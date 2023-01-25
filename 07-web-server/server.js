const express = require('express');
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

const app = express();


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    show = {
        message: 'Hola Mundo',
        url: req.url
    }
    res.send(show)
});

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');


app.get('/home', (req, res) => {

    res.render('home', {
        nombre: 'omAR aLVarez',
    });
});

app.get('/about', (req, res) => {

    res.render('about');
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});