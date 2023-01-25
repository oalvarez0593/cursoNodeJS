const axios = require('axios');

const getLugarLatLong = async (direc) => {
    const encodedURL = encodeURI(direc); //Convierte el string con espacios, en un string seguro todo pegado.

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedURL}`,
        headers: { 'x-rapidapi-key': '50299a86b0mshe184d64eb5e6371p17059fjsn7f9215ad2bf5' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para la dirección: ${direc}`);
    } else {
        const data = resp.data.Results[0];
        //console.log(resp.data.Results);
        const direccion = {
            direccion: data.name,
            latitud: data.lat,
            longitud: data.lon
        }

        return direccion;
    }
}

module.exports = {
    getLugarLatLong
}

