const bcrypt = require('bcrypt');

const password = {}

password.encriptarPassword = (password) => {
    const passwordEncriptada = bcrypt.hashSync(password, 10);

    return passwordEncriptada;
}

password.validarPassword = async (password, passwordEncriptada) => {
    const verificador = await bcrypt.compare(password, passwordEncriptada);

    return verificador ? true : false;
}

module.exports = password;