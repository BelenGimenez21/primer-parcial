const router = require('express').Router();

const validarJWT = require('../middlewares/validarJWT');

const {getTasks, getTaskById, postTask, putTask, deleteTask} = require('../controllers/task.controllers');

router.get('/getTasks',[validarJWT], getTasks);
router.get('/getTask/:taskId',[validarJWT], getTaskById);
router.post('/postTask',[validarJWT], postTask);
router.put('/putTask/:taskId',[validarJWT], putTask);
router.delete('/deleteTask/:taskId',[validarJWT], deleteTask);

module.exports = router;