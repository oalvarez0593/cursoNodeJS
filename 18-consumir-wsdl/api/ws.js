const soap = require('soap');
const express = require('express')
const app = express();

app.get('/suma', (request, response) => {
    var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
    const url2 = 'http://ws.cdyne.com/NotifyWS/phonenotify.asmx?wsdl'
    const args = { intA: 2, intB: 2 };
    soap.createClient(url, (err, client) => {
        if (err) {
            return response.status(500).send({
                status: 500,
                message: 'Error en el servidor del Web Service'
            });
        }
        client.Calculator.CalculatorSoap.Add(args, (err, resultSuma) => {
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
app.listen(3000);