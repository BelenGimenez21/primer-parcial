const router = require('express').Router();

const { postLoginUser } = require('../controllers/auth.controllers');

router.post('/loginUser', postLoginUser);

module.exports = router;