const { Router } = require('express');
const {
  validateLogin,
  validateInsert,
} = require('../middlewares/UserError');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/user', validateJWT, UserController.findUsers);
router.get('/user/:id', validateJWT, UserController.findUserById);
router.post('/login', validateLogin, UserController.login);
router.post('/user', validateInsert, UserController.insertUser);

module.exports = router;