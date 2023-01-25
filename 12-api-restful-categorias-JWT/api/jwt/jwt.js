const jwt = require('jwt-simple');
const moment = require('moment');

const secret_word = 'curso_nodeJS_Udemy';

function createToken(user) {
    let payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        google: user.google,
        img: user.img,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, secret_word);
}

module.exports = {
    createToken
}