const Task = require('../models/Task');

const taskController = {};

/*----------controlador para obtener las tareas de un usuario----------*/
taskController.getTasks = async (req, res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ userId, isActive: true });

    if (!tasks || tasks.length===0) {
        return res.status(400).json({
            message: 'No se encontraron tareas del usuario.'
        });
    }

    return res.json({
        message: 'Tareas encontradas.',
        tasks
    });
};

/*----------controlador para buscar la tarea de un usuario por su id----------*/
taskController.getTaskById = async (req, res) => {
    const id = req.params.taskId;
    const userId = req.user._id;

    const task = await Task.find({ _id: id, userId, isActive: true });

    if (!task || task.length === 0) {
        return res.status(400).json({
            message: 'No se encontró o no se puede acceder a la tarea.'
        });
    }

    return res.json({
        message: 'Tarea encontrada.',
        task
    });
};

/*----------controlador para crear una nueva tarea y guardarla en la bd----------*/
taskController.postTask = async (req, res) => {
    //se obtienen los datos
    const { title, description } = req.body;
    const userId = req.user._id;

    //se instancia un nuevo documento de MDB para ser guardado
    const newTask = new Task({
        title,
        description,
        userId
    });

    try {
        //se almacena en la bd
        const task = await newTask.save();
        //se devuelve un mensaje y la tarea creada
        return res.json({
            message: 'Tarea creada correctamente',
            task
        })
    } catch (error) {
        console.log(error)
        return res.json('Error al crear la tarea')
    }
};

/*----------controlador para modificar una tarea----------*/
taskController.putTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user._id;
    const { title, description, status } = req.body;

    const filter = { _id: taskId, userId, isActive: true }
    const update = {}

    if (title) {
        update.title = title;
    }

    if (description) {
        update.description = description;
    }

    if (status) {
        update.status = status;
    }

    const updatedTask = await Task.findOneAndUpdate(filter, update);

    if (!updatedTask) {
        return res.status(400).json({
            message: 'No se pudo actualizar la tarea.'
        })
    }

    const task = await Task.findById(taskId)

    return res.json({
        message: 'Tarea actualizda correctamente.',
        task
    })
};

/*----------controlador para eliminar una tarea----------*/
taskController.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user._id;

    const filter = { _id: taskId, userId, isActive: true }
    const update = { isActive: false }

    const deletedTask = await Task.findOneAndUpdate(filter, update);

    if (!deletedTask) {
        return res.status(400).json({
            message: 'No se pudo eliminar la tarea.'
        });
    }

    return res.json({
        message: 'Tarea eliminada correctamente.'
    });
};

module.exports = taskController;