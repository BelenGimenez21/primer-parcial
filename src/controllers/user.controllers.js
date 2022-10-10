const user = require('../models/User');

const userController = {};

/*----------controlador para obtener usuarios activos de la bd----------*/
userController.getUser = async (req, res) => {
    //se consultan los documentos en la bd
    const users = await user.find({isActive:true});
    //se devuelven todos los usuarios activos en un arreglo
    return res.json(users);
};

/*----------controlador para crear y guardar un nuevo usuario en la bd----------*/
userController.postUser = async (req, res) => {
    //se obtienen los datos
    const { username, password, email } = req.body;

    //se instancia un nuevo documento en MongoDB
    const newUser = new user({
        username,
        password,
        email
    });

    try {
        //se guarda el documento en la bd
        const savedUser = await newUser.save();
        return res.json({
            msg: 'Usuario creado correctamente',
            savedUser
        });
    
    } catch (error) {
        console.log(error);
        res.json('Error al guardar usuario')
    }  
};

/*----------controlador para modificar datos de un usuario----------*/
userController.putUser = async (req, res) => {
    const id =  req.params.id;
    const { username, password, email, ...otrosDatos } = req.body;

    const update = {}

    if (username) {
        update.username = username;
    }

    if (password) {
        update.password = password;
    }

    if (email) {
        update.email = email;
    }

    try {
        await user.findByIdAndUpdate(id, update)
        const updatedUser = await user.findById(id);
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
    const id = req.params.id;

    try {
        await user.findByIdAndUpdate(id, {isActive: false})
        return res.json('Usuario eliminado')
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error al eliminar usuario')
    }
};

module.exports = userController;