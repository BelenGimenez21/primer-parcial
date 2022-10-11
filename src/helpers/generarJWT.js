const jwt = require('jsonwebtoken');

//Para generar el token con el id del usuario y la palabra secreta
const generarJWT = uid => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if(err){
                    reject('No se pudo generar el token');
                }

                resolve(token);
            }
        );
    });
}

module.exports = generarJWT;