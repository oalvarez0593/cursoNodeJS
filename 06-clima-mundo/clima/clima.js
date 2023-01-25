const axios = require('axios');

const getClima = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f369635965b00ad16ced5da4da4b9f3b&units=metric`;
    const instance = axios.create({
        baseURL: url
    });

    const resp = await instance.get();

    if (!resp.data.main.temp) {
        throw new Error(`No hay resultados para la latitud: ${direc} y longitud: ${direc} ingresada`);
    } else {
        const data = resp.data.main.temp;

        return data;
    }
}

module.exports = {
    getClima
}