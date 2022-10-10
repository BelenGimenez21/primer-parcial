const router = require('express').Router();

const {getTask, postTask, putTask, deleteTask} = require('../controllers/task.controllers');

router.get('/getTask', getTask);
router.post('/postTask', postTask);
router.put('/putTask/:id', putTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;