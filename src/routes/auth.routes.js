const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const { postLoginUser, getLoginUser } = require('../controllers/auth.controllers');

router.post('/loginUser', postLoginUser);
router.get('/loginUser', [validarJWT], getLoginUser);

module.exports = router;