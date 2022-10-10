const router = require('express').Router();

//importación de controladores
const {
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/user.controllers');

//definición de rutas
router.get('/getUser', getUser);
router.post('/postUser', postUser);
router.put('/putUser/:id', putUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;