const bcrypt = require('bcrypt');
const User = require('../models/User');
const generarJWT = require('../helpers/generarJWT');

const authController = {}

/*----------controlador para iniciar sesión----------*/
authController.postLoginUser = async (req, res) => {
    const { email, password } = req.body;

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

module.exports = authController;