const bcrypt = require('bcrypt');
const User = require('../models/User');
const generarJWT = require('../helpers/generarJWT');

//const { validarPassword } = require('./../helpers/password');

const authController = {}

/*----------controlador para iniciar sesión----------*/
authController.postLoginUser = async (req, res) => {
    const { email, password } = req.body;

    /*   TRY-CATCH   */
    //buscar por email del usuario si este existe en la bd y esta activo
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: 'Error: El usuario no existe.'
        });
    }

    if (!user.isActive) {
        return res.status(400).json({
            message: 'Error: Usuario inactivo'
        });
    }

    //const passwordEncriptada = user.password;
    //const validarContra = await validarPassword(password, passwordEncriptada);

    const validarPassword = bcrypt.compareSync(password, user.password);

    if (!validarPassword) {
        return res.status(400).json({
            message: 'Error: La contraseña no es válida.'
        });
    }
    
    //generar token
    const uid = user._id;
    const token = await generarJWT(uid)
    
    return res.json({ token });
};

/*----------controlador para obtener datos del usuario loggeado----------*/
authController.getLoginUser = (req, res) => {
    return res.json({ ...req.user._doc });
};

module.exports = authController;