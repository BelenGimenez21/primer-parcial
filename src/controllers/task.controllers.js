const task = require('../models/Task');
const taskController = {};

/*----------controlador para obtener las tareas de la bd----------*/
taskController.getTask = async (req, res) => {
    //se consultan los documentos en la bd
    const tasks = await task.find({isActive: true});
    //se devuelven las tareas activas en un arreglo
    return res.json(tasks);
};

/*----------controlador para crear y guardar una nueva tarea en la bd----------*/
taskController.postTask = async (req, res) => {
    // Se obtienen los datos enviados por método POST
    const { title, description } = req.body;

    // Se instancia un nuevo documento de MongoDB para luego ser guardado
    const newTask = new task({
        title,
        description,
        userId
    });

    try {
        // Se almacena en la base de datos con método asícrono .save()
        const task = await newTask.save();
        // Se devuelve una respuesta al cliente con un mensaje y los datos de la tarea creada.
        return res.json({
            msg: 'Tarea creada correctamente',
            task
        });
        
    } catch (error) {
        console.log(error)
        return res.json('Error al guardar la tarea')
    }
};

/*----------controlador para modificar una tarea----------*/
taskController.putTask = async (req, res) =>{
    const id = req.params.id;
    const { title, description, ...otrosDatos } = req.body;

    const update = {}

    if (title) {
        update.title = title;
    }

    if (description) {
        update.description = description;
    }

    try {
        await task.findByIdAndUpdate(id, update)
        const updatedTask = await task.findById(id);
        return res.json({
            msg: 'Tarea actualizada correctamente',
            updatedTask
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json('Error al actualizar la tarea')
    }
};

/*----------controlador para eliminar una tarea----------*/
taskController.deleteTask = async (req, res) =>{
    const id = req.params.id;

    try {
        await task.findByIdAndUpdate(id, { isActive: false })
        return res.json('Tarea eliminada correctamente');
    } catch (error) {
        console.log(error.msg)
        return res.status(500).json('Error al eliminar la tarea');
    }

};

module.exports = taskController;