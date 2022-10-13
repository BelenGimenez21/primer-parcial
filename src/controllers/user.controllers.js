const user = require('../models/User');
const bcrypt = require('bcrypt')

const userController = {};

/*----------controlador para obtener datos del usuario loggeado----------*/
userController.getUser = (req, res) => {
    return res.json({ ...req.user._doc });
};

/*----------controlador para crear y guardar un nuevo usuario en la bd----------*/
userController.postUser = async (req, res) => {
    //se obtienen los datos
    const { username, password, email } = req.body;

    //encriptar la contraseña
    const passwordEncriptada = bcrypt.hashSync(password, 10);

    //se instancia un nuevo documento en MongoDB
    const newUser = new user({
        username,
        password: passwordEncriptada,
        email
    });

    try {
        //se guarda el documento en la bd
        const savedUser = await newUser.save()
        console.log(savedUser)

        //const savedUser = await user.findOne({email})
        return res.json({
            msg: 'Usuario creado correctamente',
            savedUser
        });
    
    } catch (error) {
        console.log(error);
        res.json('Error al crear el usuario')
    }  
};

/*----------controlador para modificar datos de un usuario----------*/
userController.putUser = async (req, res) => {
    const id =  req.user._id;
    const { username, password, email } = req.body;

    const filter = { _id: id, isActive: true }
    const update = {}

    if (username) {
        update.username = username;
    }

    if (password) {
        update.password = bcrypt.hashSync(password, 10);
    }

    if (email) {
        update.email = email;
    }

    try {
        await user.findOneAndUpdate(filter, update)
        const updatedUser = await user.findById(id)
        console.log(updatedUser)

        return res.json({
            msg: 'Usuario actualizado correctamente',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error al actualizar el usuario')
    }
};

/*----------controlador para eliminar usuarios----------*/
userController.deleteUser = async (req, res) => {
    const id = req.user._id;

    try {
        await user.findByIdAndUpdate(id, {isActive: false})
        return res.json('Usuario eliminado')
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error al eliminar usuario')
    }
};

module.exports = userController;