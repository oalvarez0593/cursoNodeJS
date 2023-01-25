const soap = require('soap');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/suma', (request, response) => {

    var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
    const url2 = 'http://ws.cdyne.com/NotifyWS/phonenotify.asmx?wsdl'
    const args = { intA: request.body.intA, intB: request.body.intB };
    soap.createClient(url, (err, client) => {
        if (err) {
            return response.status(500).send({
                status: 500,
                message: 'Error en el servidor del Web Service'
            });
        }
        client.Calculator.CalculatorSoap.Add(args, (err, resultSuma) => {
            if(err) {
                return response.status(500).send({
                    status: 500,
                    message: 'Error en la petición del servidor'
                });
            }
            return response.status(200).send({
                status: 200,
                ResultadoSuma: resultSuma.AddResult
            });
        });
    });
})

app.get('/division', (request, response) => {
    var url = 'http://www.dneonline.com/calculator.asmx?wsdl';

    const args = { intA: 10, intB: 2 };
    soap.createClient(url, (err, client) => {
        if (err) {
            return response.status(500).send({
                status: 500,
                message: 'Error en el servidor del Web Service'
            });
        }

        client.Calculator.CalculatorSoap.Divide(args, (err, resultDivision) => {
            return response.status(200).send({
                status: 200,
                ResultadoDivision: resultDivision.DivideResult
            });
        });
    });
})

app.post('/', (request, response) => {
    console.log(request.params.id);
});
app.listen(3000);