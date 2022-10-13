const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT')

//importación de controladores
const { getUser, postUser, putUser,deleteUser } = require('../controllers/user.controllers');

//definición de rutas
router.get('/getUser', [validarJWT], getUser);
router.post('/postUser', postUser);
router.put('/putUser',[validarJWT], putUser);
router.delete('/deleteUser',[validarJWT], deleteUser);

module.exports = router;